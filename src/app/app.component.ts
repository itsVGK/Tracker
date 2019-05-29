import { Component, OnInit } from '@angular/core';

// import { LoginComponent } from './user/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tracker';
  public isLoggedIn: boolean=true;

  // constructor(private loginComponent: LoginComponent) {
  // }

  ngOnInit() {
    // this.isLoggedIn=LoginComponent.isLoggedIn();
  }
}
