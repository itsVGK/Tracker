import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router'
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public loggedIn: boolean = false;

  constructor(private router: Router, private appService: AppService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  login = () => {

    let loggedUser = {
      email: this.email,
      password: this.password
    }

    // Cookie.set('userName', 'userName')  //TBD
    // Cookie.set('authToken', 'admin');  //TBD

    this.appService.loginService(loggedUser).subscribe(
      (result) => {
        if (result.status === 200) {
          this.loggedIn = true;
          Cookie.set('userId', result.data.userId);
          Cookie.set('userName', result.data.firstName + ' ' + result.data.lastName);
          Cookie.set('authToken', 'admin');
          this.toastr.success('Logged In Successfully', 'Success')
          this.router.navigate(['list']);
        } else {
          this.toastr.error('Please provide Correct Credentials', 'InCorrect Credentials')
          this.router.navigate(['login']);
        }
      }
    )
  }   //end log in

  public isLoggedIn = () => {
    return this.loggedIn;
  }
}
