import { Component, OnInit } from '@angular/core';

import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

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
  public assignee: String = "nt6IzALE2";
  public description: String;
  public reporteeId: String;

  constructor(private appService: AppService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.reporteeId = Cookie.get('userId');
    this.getAssigneeList();
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
        }else{
          this.assigneeList=['No Assignees Available'];
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
    console.log(issue)
    this.appService.createIssueService(issue).subscribe(
      (result) => {
        if (result.status === 200) {
          this.toastr.success('Issue Created Successfully', 'Success')
          this.router.navigate(['list']);
        } else {
          this.toastr.error('Unable to create an Issue', 'Sorry')
          this.router.navigate(['create']);
        }
      }
    )

  }
}
