import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpParams } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  public userId: String;

  constructor(private http: HttpClient) {
    this.userId = Cookie.get('userId');
  }

  public url = `http://trackerapi.shakeit.live/api/v1/issue`;
  // public url = `http://localhost:3000/api/v1/issue`;

  public loginService(user): Observable<any> {

    const params = new HttpParams()
      .set('email', user.email)
      .set('password', user.password)

    return this.http.post(`${this.url}/login`, params);
  }

  public signupService(user): Observable<any> {
    const params = new HttpParams()
      .set('firstName', user.firstName)
      .set('lastName', user.lastName)
      .set('email', user.email)
      .set('password', user.password)
    return this.http.post(`${this.url}/signup`, params);
  }

  //for create view to get
  public getAssigneeList(): Observable<any> {
    return this.http.get(`${this.url}/users`);
  }

  //for create view to post
  public createIssueService(issue): Observable<any> {
    const params = new HttpParams()
      .set('title', issue.title)
      .set('status', issue.status)
      .set('assignee', issue.assignee)
      .set('description', issue.description)
      .set('reporteeId', issue.reporteeId)
    return this.http.post(`${this.url}/create`, params);
  }

  //for List View to get
  public getAllIssuesByUser(userId): Observable<any> {
    return this.http.get(`${this.url}/getBy/user/${userId}`);
  }

  public getAllIssuesByAssignee(assignee): Observable<any> {
    return this.http.get(`${this.url}/getBy/assignee/${assignee}`);
  }

  public getAllIssues(): Observable<any> {
    return this.http.get(`${this.url}/issues`)
  }

  //for View view to get
  public getIssuebyId(issueId): Observable<any> {
    return this.http.get(`${this.url}/getBy/issue/${issueId}`);
  }

  public getUserbyId(userId): Observable<any> {
    return this.http.get(`${this.url}/users/${userId}`);
  }

  //for View view- to update
  public updateIssueByUser(issue): Observable<any> {
    return this.http.post(`${this.url}/update/${issue.issueId}`, issue);
  }

  //for View view to update watch list
  public updateWatchList(watch): Observable<any> {
    let params = new HttpParams()
      .set('issueId', watch.issueId)
      .set('userId', watch.userId);

    return this.http.post(`${this.url}/addWatch`, params);
  }

  //get watchers list for specific issueId
  public getWatcherforIssue(issueId): Observable<any> {
    return this.http.get(`${this.url}/getWatcher/${issueId}`);
  }

  //to upload files
  public uploadFiles(uploader): void {

    // uploader: FileUploader = new FileUploader({ url: '' });
  }

  public updateNote(issueId) {
    // console.log('calling update')
    let params = new HttpParams()
      .set('issueId', issueId);
    return this.http.post(`${this.url}/updateNote/forUser/${this.userId}`, params);
  }
}
