import { Component, OnInit } from '@angular/core';

import { AppService } from './../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {

  public userId: String;
  public issueId: String;
  public title: String = "sample";
  public status: String;
  public reportee: String = "sample reporter";
  public description: String;
  public comments: any = ['sample1', 'sample2', 'sample3'];
  public assignee: String;
  public statusList: any = ['backlog', 'In-Progress', 'in-test', 'done'];
  public assigneeList: any = ['get from api', 'api 2'];
  public enableEdit: boolean = false;

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.issueId = this.activatedRoute.snapshot.paramMap.get('issueId');
    this.assignee = 'api 2';
    this.status = this.statusList[3];
    this.getIssuebyId(this.issueId);
  }

  getIssuebyId = (issueId) => {
    this.appService.getIssuebyId(issueId).subscribe(
      (issue) => {
        if (issue.status === 200) {
          //set values for respective form variables
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
      reportee: this.reportee,
      description: this.description,
      comments: this.comments,
      assignee: this.assignee,
      issueId: this.issueId
    }

    this.appService.updateIssueByUser(editedValue).subscribe(
      (result) => {
        if (result.status === 200) {
          this.router.navigate(['list']);
        } else {
          this.router.navigate(['view']);
        }
      }
    )
  }  //end edit form

  addWatch = () => {
    
    let watch={
      'issueId':this.issueId,
      'userId':Cookie.get('userId')
    }

    this.appService.updateWatchList(watch).subscribe(
      (result) => {
        if (result.status === 200) {
          console.log('added to the list')
        } else {
          console.log('unable to add');
        }
      }
    )
  }  //end add Watch 
}