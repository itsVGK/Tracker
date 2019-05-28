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

  public firstName: String;
  public lastName: String;
  public email: EmailValidator;
  public password: String;

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    // this.toastr.success('here')
  }

}
