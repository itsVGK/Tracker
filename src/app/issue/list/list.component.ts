import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dashboard } from './dashboard';
import { ViewChild } from '@angular/core';

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
    this.dataSource = new MatTableDataSource(this.issueListbyUser);
  }

  ngOnInit() {
    this.userId = Cookie.get('userId')
    this.getAllIssuesByAssignee();
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['issueId', 'title', 'status', 'reportee', 'date'];
  dataSource: MatTableDataSource<Dashboard>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public generateUser(): any {

    for (let i = 0; i < 5; i++) {
      let tem = { 'issueId': i, 'status': 'stat ' + i, 'title': '', 'reportee': '', 'date': '' };
      this.issueListbyUser.push(tem);
    }
  }

  public popUpNotification = () => {
    console.log('in pop up');
    this.toastr.success('Welcome Gopala');
  }

  public getAllIssuesByAssignee(): any {
    this.appService.getAllIssuesByAssignee(this.userId).subscribe(
      (issues) => {
        if (issues.status == 400) {
          this.toastr.warning('No Issues were Assigned', 'Enjoy');
          this.issueListbyUser = [];
        }
        else {
          let dat = issues.data
          for (let x in dat) {
            let reporteeName;
            this.appService.getUserbyId(dat[x].reporteeId).subscribe(
              (data) => {
                if (data.status == 400) {
                  return;
                } else {
                  reporteeName = data.data[0].firstName + ' ' + data.data[0].lastName;
                  let tem = { 'issueId': dat[x].issueId, 'status': dat[x].status, 'title': dat[x].title, 'reportee': reporteeName, 'date': dat[x].createdOn };
                  this.issueListbyUser.push(tem);
                }
              })
          }
        }
      })
  }

  issueSelected = (issue) => {
    this.router.navigate(['/view', issue.issueId]);
  }


}
