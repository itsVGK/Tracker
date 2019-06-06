import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = `http://localhost:3000`;
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

  public updateChange = (data) => {
    this.socket.emit('updateChange', data);
  }

  public getNotification = () => {
    return Observable.create((observer) => {
      this.socket.on('getNote', (msg) => {
        observer.next(msg);
      })
    })
  }

}
