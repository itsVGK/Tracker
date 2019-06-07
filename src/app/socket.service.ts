import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = `http://api.shakeit.live`;
  // private url = `http://localhost:3000`;
  public socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  public isConnected = () => {
    return Observable.create((observer) => {
      this.socket.on('start', (msg) => {
        observer.next(msg);
      })
    })
  }

  public updateChange = (data, issueId) => {
    this.socket.emit('updateChange', data, issueId);
  }

  public getNotification = (userId) => {
    return Observable.create((observer) => {
      this.socket.on(userId, (data) => {
        observer.next(data);
      })
    })
  }

}
