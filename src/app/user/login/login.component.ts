import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router'
import { AppService } from './../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: String;
  public password: String;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }

  login = () => {
    let loggedUser = {
      userName: this.userName,
      password: this.password
    }

    this.appService.loginService(loggedUser).subscribe(
      (result) => {
        if (result.status === 200) {
          this.router.navigate(['list']);
        } else {
          this.router.navigate(['login']);
        }
      }
    )

  }
}
