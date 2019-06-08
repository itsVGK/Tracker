import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AppService } from './../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

import { DataSharedService } from './../data-shared.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {

  public userId: String;
  public issueId: String;
  public reportee: String;
  public statusList: any = ['backlog', 'In-Progress', 'in-test', 'done'];
  public assigneeList: any;
  public enableEdit: boolean = false;
  public notificationList: Array<any> = [];
  public watchersList: any;
  public noteSet: Set<any> = new Set();
  public noteList: Array<any> = [];
  public currIssue: any = [];

  constructor(private socketService: SocketService, private dataShared: DataSharedService, private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.getAssigneeList();
    this.issueId = this.activatedRoute.snapshot.paramMap.get('issueId');
  }

  ngOnInit() {
    this.userId = Cookie.get('userId');
    this.getIssuebyId(this.issueId);
    this.getNotificationList();
    this.getWatchers();
    this.dataShared.isUserLoggedIn.next(true);
  }

  public uploader: FileUploader = new FileUploader({ url: '' });

  getAssigneeList = () => {
    this.appService.getAssigneeList().subscribe(
      (result) => {
        if (result.status === 200) {
          this.assigneeList = [];
          for (let x in result.data) {
            let tem = { 'firstName': result.data[x].firstName, 'lastName': result.data[x].lastName, 'assigneeId': result.data[x].userId };
            this.assigneeList.push(tem);
          }
        } else {
          this.assigneeList = ['No Assignees Available'];
        }
      })
  }

  getNotificationList=()=>{
    // console.log(this.userId)
    this.appService.getUserbyId(this.userId).subscribe((result)=>{
      // console.log(result)
      if(result.status===400){
        this.notificationList=[];
      }else{
        let tem=result.data[0].noteList;
        for(let t in tem){
        this.notificationList.push(tem[t])
        }
      }
    })
  }

  getWatchers = () => {
    this.watchersList = [];
    this.appService.getWatcherforIssue(this.issueId).subscribe(
      (data) => {
        if (data.status == 200) {
          let users = data.data.usersId;
          for (let user in users) {
            this.noteSet.add(users[user]);
            this.appService.getUserbyId(users[user]).subscribe((data1) => {
              if (data1.status == 400) {
              } else {
                this.watchersList.push(data1.data[0].firstName + ' ' + data1.data[0].lastName)
              }
            })
          }
          // console.log('note list', this.noteList);
        } else {
          this.watchersList.push('No Watchers Subscribed');
        }
      });
  }

  //to display in form
  getIssuebyId = (issueId) => {
    this.appService.getIssuebyId(issueId).subscribe(
      (issue) => {
        if (issue.status === 200) {
          this.toastr.success("issue details were retrieved successfully", 'hurrahhh')
          this.currIssue = issue["data"][0];
          this.appService.getUserbyId(this.currIssue.reporteeId).subscribe(
            (data) => {
              if (data.status == 400) {
                this.reportee = 'error';
              } else {
                this.reportee = data.data[0].firstName + ' ' + data.data[0].lastName;
              }
            })
        } else {
        }
      }
    )
  }

  enableEditForm = () => {
    this.enableEdit = true;
  }

  //save the updated form
  editform = () => {
    console.log(this.currIssue)
    this.appService.uploadFiles(this.uploader);
    this.noteSet.add(this.currIssue.assignee)
    this.noteSet.add(this.currIssue.reporteeId)
    this.noteSet.forEach(note => {
      this.noteList.push(note);
    })
    // console.log('note set', this.noteSet)
    // console.log('note list', this.noteList)

    this.appService.updateIssueByUser(this.currIssue).subscribe(
      (result) => {
        if (result.status === 200) {
          this.socketService.updateChange(this.noteList, this.currIssue.issueId);
          this.toastr.success('Issue Details Updated Successfully', 'Updated')
          this.router.navigate(['list']);
        } else {
          this.toastr.warning('Unable to update th issue');
          this.router.navigate(['view']);
        }
      }
    )
  }  //end edit form

  addWatch = () => {

    let watch = {
      'issueId': this.issueId,
      'userId': Cookie.get('userId')
    }

    this.appService.updateWatchList(watch).subscribe(
      (result) => {
        if (result.status === 200) {
          this.getWatchers();
          this.toastr.info('User Added to the watch List', 'Congratz')
        } else {
          this.toastr.info('User might Already be available in Watch list', 'OOPS')
        }
      })
  }  //end add Watch 
}