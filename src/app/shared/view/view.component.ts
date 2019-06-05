import { Component, OnInit } from '@angular/core';

import { AppService } from './../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {

  public userId: String;
  public issueId: String;
  public title: String;
  public status: String;
  public reportee: String;
  public reporteeName: String
  public description: String;
  public comments: any;
  public assignee: any;
  public statusList: any = ['backlog', 'In-Progress', 'in-test', 'done'];
  public assigneeList: any;
  public enableEdit: boolean = false;

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.issueId = this.activatedRoute.snapshot.paramMap.get('issueId');
    this.getAssigneeList();
    this.getIssuebyId(this.issueId);
  }

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

  getIssuebyId = (issueId) => {
    this.appService.getIssuebyId(issueId).subscribe(
      (issue) => {
        if (issue.status === 200) {
          this.toastr.success("issue details were retrieved successfully", 'hurrahhh')
          //set values for respective form variables
          this.userId = issue.data[0].userId;
          this.title = issue.data[0].title;
          this.status = issue.data[0].status;
          this.appService.getUserbyId(issue.data[0].reporteeId).subscribe(
            (data) => {
              if (data.status == 400) {
                return;
              } else {
                this.reportee = data.data[0].firstName + ' ' + data.data[0].lastName;
              }
            })
          this.appService.getUserbyId(issue.data[0].assignee).subscribe(
            (data) => {
              if (data.status == 400) {
                return;
              } else {
                this.assignee= { 'firstName': data.data[0].firstName, 'lastName': data.data[0].lastName, 'assigneeId': data.data[0].userId }
                console.log(this.assignee);
              }
            })
          this.description = issue.data[0].description;
          this.comments = issue.data[0].comments;
        } else {
        }
      }
    )
  }

  enableEditForm = () => {
    this.enableEdit = true;
  }

  editform = () => {

    let editedValue = {
      title: this.title,
      status: this.status,
      description: this.description,
      comments: this.comments,
      assignee: this.assignee,
      issueId: this.issueId
    }
    console.log(editedValue)
    this.appService.updateIssueByUser(editedValue).subscribe(
      (result) => {
        if (result.status === 200) {
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
          this.toastr.info('User Added to the watch List', 'Congratz')
        } else {
          this.toastr.info('User might Already be available in Watch list', 'OOPS')
        }
      })
  }  //end add Watch 
}