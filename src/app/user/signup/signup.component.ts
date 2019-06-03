import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDetails } from './user-details';
import { EmailValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppService } from './../../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private appService: AppService) { }

  public firstName: String;
  public lastName: String;
  public email: EmailValidator;
  public password: String;
  public createdOn: any;

  ngOnInit() {
  }

  createUser = () => {

    let user: UserDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      createdOn: Date.now()
    }

    this.appService.signupService(user).subscribe(
      (result) => {
        if (result.status === 200) {
          this.toastr.success("User Created Successfully", "Great");
          this.router.navigate(['login']);
        } else {
          this.toastr.error('Unable to create the user', 'Sorry!!');
          this.router.navigate(['signup']);
        }
      }
    )
  }

}
