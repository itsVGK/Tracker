import { Component, OnInit } from '@angular/core';

import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public assigneeList: any = ['sam1', 'sam2'];
  public statusList: any = ['backlog', 'In-Progress', 'in-test', 'done'];

  public status: String;
  public title: String;
  public assignee: String;
  public description: String;
  public reporteeId: String;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.reporteeId=Cookie.get('userId');
    this.getAssigneeList();
  }

  getAssigneeList = () => {
    this.appService.getAssigneeList().subscribe(
      (assignee) => {
        this.assigneeList = [];
        for (let x in assignee) {
          let tem = { 'firstName': x, 'lastName': assignee[x] };
          this.assigneeList.push(tem);
        }
      }
    )
  }

  createUser = () => {

    let issue = {
      title: this.title,
      status: this.status,
      assignee: this.assignee,
      description: this.description,
      reporteeId: this.reporteeId
    }

    this.appService.createIssueService(issue).subscribe(
      (result) => {
        if (result.status === 200) {
          this.router.navigate(['list']);
        } else {
          this.router.navigate(['create']);
        }
      }
    )

  }
}
