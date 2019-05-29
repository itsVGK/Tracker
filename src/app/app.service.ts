import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) { }

  public url = `http://localhost:3000/api/v1/issue`;

  public loginService(user): Observable<any> {

    const params = new HttpParams()
      .set('userName', user.userName)
      .set('password', user.password)

    return this.http.post(`this.url/login`, params);
  }

  public signupService(user): Observable<any> {
    const params = new HttpParams()
      .set('firstName', user.firstName)
      .set('lastName', user.lastName)
      .set('email', user.email)
      .set('password', user.password)

    return this.http.post(`this.url/signup`, params);
  }

  //for create view to get
  public getAssigneeList():Observable<any>{
    return this.http.get(`this.url/getAll`);
  }

  //for create view to post
  public createIssueService(issue): Observable<any> {
    const params = new HttpParams()
      .set('title', issue.title)
      .set('status', issue.status)
      .set('reporter', issue.reporter)
      .set('description', issue.description)
      .set('comments', issue.comments)
    return this.http.post(`this.url/create`, params);
  }

  //for List View to get
  public getAllIssuesByUser(userId): Observable<any> {

    return this.http.get(`this.url/list/:${userId}`);
  }

  //for View view to get
  public getIssuebyId(issueId):Observable<any>{
    return this.http.get(`this.url/:issueId/issue`);
  }

  //for View view- to update
  public updateIssueByUser(issue): Observable<any> {
    const params = new HttpParams()
      .set('title', issue.title)
      .set('status', issue.status)
      .set('reporter', issue.reporter)
      .set('description', issue.description)
      .set('comments', issue.comments)
    return this.http.post(`this.url/update/:${issue.issueId}`, params);
  }

  //for View view to update watch list
  public updateWatchList(list):Observable<any>{
    let params=new HttpParams()
    .set('watcher', list.watcher);
    return this.http.post(`this.url/upWatch`, params);
  }

}