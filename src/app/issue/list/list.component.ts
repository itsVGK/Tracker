import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataSharedService } from 'src/app/shared/data-shared.service';
import { SocketService } from 'src/app/socket.service';

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
  public getForMe: boolean = true;
  public issueListbyUser: Array<any> = [];

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'ISSUE ID', className: 'text-success', name: 'issueId', filtering: { filterString: '', placeholder: 'Filter by issueId' } },
    {
      title: 'STATUS',
      className: 'text-success',
      name: 'status',
      sort: true,
      filtering: { filterString: '', placeholder: 'Filter by status' }
    },
    {
      title: 'TITLE', className: ['office-header', 'text-success'],
      filtering: { filterString: '', placeholder: 'Filter by Title' }, name: 'title', sort: 'asc'
    },
    { title: 'REPORTEE', className: 'text-success', name: 'reportee', sort: '', filtering: { filterString: '', placeholder: 'Filter by reportee.' } },
    { title: 'DATE', filtering: { filterString: '', placeholder: 'Filter by Date' }, className: 'text-success', name: 'date' },
  ];

  public page: number = 1;
  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };
  private data: Array<any> = this.issueListbyUser;

  public constructor(private socketService: SocketService, private dataShared: DataSharedService, private router: Router, private appService: AppService, private toastr: ToastrService) {
    this.length = this.data.length;
    this.userId = Cookie.get('userId')
    this.dataShared.isUserLoggedIn.next(true);
    this.dataShared.userName.next(true);
    this.getNotifications(this.userId);
  }

  public ngOnInit(): void {
    this.userId = Cookie.get('userId')
    this.getIssues();
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 2000);
  }

  getNotifications = (userId) => {
    this.socketService.getNotification(userId).subscribe((issueId) => {
      this.toastr.info(`issueid ${issueId} edited`, 'Edited');
      this.appService.updateNote(issueId).subscribe((data) => {
        // console.log(data)
      })
    })
  }

  public assignedToMe(isAssignedToMe) {
    if (isAssignedToMe) {
      this.getForMe = true;
    } else {
      this.getForMe = false;
    }
    this.getIssues();
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    this.data = this.issueListbyUser;
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    this.router.navigate(['/view', data.row.issueId]);
  }

  public getIssues(): any {
    if (this.getForMe) {
      this.appService.getAllIssuesByAssignee(this.userId).subscribe(
        (issues) => {
          this.issueListbyUser = [];
          if (issues.status == 400) {
            this.toastr.warning('No Issues were Assigned', 'Enjoy');
          } else {
            let dat = issues.data
            for (let x in dat) {
              let reporteeName;
              this.appService.getUserbyId(dat[x].reporteeId).subscribe(
                (data) => {
                  if (data.status == 400) {
                    return;
                  } else {
                    reporteeName = data.data[0].firstName + ' ' + data.data[0].lastName;
                    let tem = { 'issueId': dat[x].issueId, 'status': dat[x].status, 'title': dat[x].title, 'reportee': reporteeName, 'date': dat[x].createdOn, 'reporteeId': dat[x].reporteeId };
                    this.issueListbyUser.push(tem);
                  }
                })
            }
          }
          setTimeout(() => {
            this.onChangeTable(this.config, true);
          }, 3000);
        })
    } else {
      this.appService.getAllIssues().subscribe(
        (issues) => {
          this.issueListbyUser = [];
          if (issues.status == 400) {
            this.toastr.warning('No Issues were Available', 'Enjoy');
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
                    let tem = { 'issueId': dat[x].issueId, 'status': dat[x].status, 'title': dat[x].title, 'reportee': reporteeName, 'date': dat[x].createdOn, 'reporteeId': dat[x].reporteeId };
                    this.issueListbyUser.push(tem);
                  }
                })
            }
            // console.log(this.issueListbyUser)
          }
          setTimeout(() => {
            this.onChangeTable(this.config, true);
          }, 3000);
        })
    }
  }
}