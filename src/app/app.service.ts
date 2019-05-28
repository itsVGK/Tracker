import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) { }

  public url = `http://localhost:4000/api/v1/issue`;

  public loginService(user): Observable<any> {

    const params = new HttpParams()
      .set('userName', user.userName)
      .set('password', user.password)

    return this.http.post(`this.url/login`, params);
  }

}
