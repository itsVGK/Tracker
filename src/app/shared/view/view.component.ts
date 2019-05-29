import { Component, OnInit } from '@angular/core';

import { AppService } from './../../app.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  public reportee: String;
  public description: String;
  public comments: any = ['sample1', 'sample2', 'sample3'];
  public assignee: String;

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.issueId = this.activatedRoute.snapshot.paramMap.get('issueId');
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

  editform = () => {

    let editedValue = {
      title: this.title,
      status: this.status,
      reportee: this.reportee,
      description: this.description,
      comments: this.comments,
      assignee: this.assignee,
      issueId:this.issueId
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
    console.log('add user to the watch list');
    let watcher = {
      'name': 'sample'
    }

    this.appService.updateWatchList(watcher).subscribe(
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