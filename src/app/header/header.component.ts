import { Component, OnInit } from '@angular/core';
import { DataSharedService } from './../shared/data-shared.service';
import { Cookie } from 'ng2-cookies';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isUserLoggedin: boolean;
  public userName: String;
  constructor(private dataShared: DataSharedService, private router: Router) {

    this.dataShared.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedin = value;
    })
    this.dataShared.userName.subscribe(value => {
      this.userName = value;
    })
  }

  ngOnInit() {
  }

  logout = () => {
    Cookie.delete('userId');
    Cookie.delete('authToken');
    this.router.navigate(['login']);
  }

}
