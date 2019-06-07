import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './../app.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  // constructor(private viewComp: ViewComponent) {
  //   console.log('data shared service called')
  //   this.viewComp.notifyUsersOnEditForm.subscribe({
  //     next: (event) => {
  //       console.log('in subscription to send notification ', event);
  //     }
  //   })
  // }

  constructor(private appService: AppService, private toastr: ToastrService) { }

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userName: BehaviorSubject<String> = new BehaviorSubject<String>("");

  // public getuserName = (userId) => {
  //   let user = null;
  //   this.appService.getUserbyId(userId).subscribe(
  //     (data) => {
  //       if (data.status == 400) {
  //       } else {
  //         user = {
  //           'userName': data.data[0].firstName + ' ' + data.data[0].lastName,
  //           'userId': userId
  //         }
  //         console.log(user)
  //       }
  //     })
  //   return user;
  // }

}
