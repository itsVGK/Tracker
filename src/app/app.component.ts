import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'tracker';

  public isLoggedIn: String;
  public userName: String;
  public authToken: String = 'admin';
  public count: number = 3;
  public isCollapsed: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.userName = Cookie.get('userName');
    this.isLoggedIn = Cookie.get('authToken');
  }

  logout = () => {
    Cookie.delete('authToken');
    Cookie.delete('userName');
    this.router.navigate(['login']);
  }
}
