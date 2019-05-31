import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';

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
  public date: any;

  public issueListbyUser: any = [];

  constructor(private router: Router, private appService: AppService, private toastr: ToastrService) {
  }

  ngOnInit() {
    // this.getAllIssuesByUser();
    this.generateUser();
    // this.popUpNotification();
  }

  public generateUser(): any {

    for (let i = 0; i < 5; i++) {
      let tem = { 'issueId': i, 'status': 'stat ' + i };
      this.issueListbyUser.push(tem);
    }
  }

  public popUpNotification = () => {
    console.log('in pop up');
    this.toastr.success('Welcome Gopala');
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

  issueSelected = (issueId) => {
    console.log(issueId);
    this.toastr.success('Welcome Gopala', 'HI');
    this.router.navigate(['/view', issueId]);
  }


}
