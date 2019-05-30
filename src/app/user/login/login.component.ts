import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router'
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: String;
  public password: String;
  public loggedIn: boolean = false;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }

  login = () => {

    let loggedUser = {
      userName: this.userName,
      password: this.password
    }
    Cookie.set('authToken', 'admin');
    console.log('authtoken has been set')
    this.appService.loginService(loggedUser).subscribe(
      (result) => {
        if (result.status === 200) {

          this.loggedIn = true;
          Cookie.set('authToken', 'admin');
          this.router.navigate(['list']);
        } else {
          this.router.navigate(['login']);
        }
      }
    )
  }   //end log in

  public isLoggedIn = () => {
    return this.loggedIn;
  }
}
