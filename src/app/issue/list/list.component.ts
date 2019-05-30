import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './../../app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public userId: String;
  public issueId: String;
  public title: String;
  public status: String;
  public reportee: String;
  public description: String;
  public assignee: String;

  public issueListbyUser: any = [{
    'userId': 'sample',
    'status': 'sample status',
    'title': 'sam tit',
    'assignee': 'sam assig',
    'date': Date.now(),
    'issueId':'sam Issue id'
  }];

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    // this.getAllIssuesByUser();
  }

  public getAllIssuesByUser(): any {
    this.appService.getAllIssuesByUser(this.userId).subscribe(
      (issues) => {
        this.issueListbyUser = [];
        for (let x in issues) {
          let tem = { 'userId': x, 'userName': issues[x] };
          this.issueListbyUser.push(tem);
        }
      }
    )
  }

  issueSelected=(issueId)=>{
    console.log(issueId);
    this.router.navigate(['/view', issueId]);
  }


}
