import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router'
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { DataSharedService } from './../../shared/data-shared.service';
import { SocketService } from 'src/app/socket.service';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public loggedIn: boolean = false;

  private user: SocialUser;

  constructor(private authService: AuthService, private socketService: SocketService, private router: Router, private appService: AppService, private toastr: ToastrService, private dataShared: DataSharedService) {
    this.isConnected();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  isConnected() {
    this.socketService.isConnected().subscribe((msg) => {
    })
  }

  login = () => {

    let loggedUser = {
      email: this.email,
      password: this.password
    }

    this.appService.loginService(loggedUser).subscribe(
      (result) => {
        if (result.status === 200) {
          // this.loggedIn = true;
          let userName = result.data.firstName + ' ' + result.data.lastName;
          Cookie.set('userId', result.data.userId);
          Cookie.set('authToken', 'admin');
          this.dataShared.isUserLoggedIn.next(true);
          this.dataShared.userName.next(userName)
          this.toastr.success('Logged In Successfully', 'Success')
          this.router.navigate(['list']);
        } else {
          this.toastr.error('Please provide Correct Credentials', 'InCorrect Credentials')
          this.router.navigate(['login']);
        }
      }
    )
  }   //end log in

  // public isLoggedIn = () => {
  //   return this.loggedIn;
  // }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // } 
 
  signOut(): void {
    this.authService.signOut();
  }
}
