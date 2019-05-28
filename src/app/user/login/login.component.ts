import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName:String;
  public password:String;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
 
}
