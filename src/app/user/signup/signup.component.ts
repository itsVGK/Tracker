import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDetails } from './user-details';
import { EmailValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService) { }

  public firstName: String;
  public lastName: String;
  public email: EmailValidator;
  public password: String;

  ngOnInit() {
  }

  createUser = () => {
    let user: UserDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }

  }

}
