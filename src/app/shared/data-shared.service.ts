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

  public updateNotification = (editedValue) => {
    this.appService.updateNotification(editedValue).subscribe((notify) => {
      if (notify.status === 200) {
        this.toastr.success('Notifications are Updated', 'Here')
      } else {
        this.toastr.success('Unable to retrieve the notifications', 'Try')
      }
    })
  }

  public getuserName = (userId) => {
    this.appService.getUserbyId(userId).subscribe(
      (data) => {
        if (data.status == 400) {
          return;
        } else {
          let user = {
            'userName': data.data[0].firstName + ' ' + data.data[0].lastName,
            'userId': userId
          }
          return user;
        }
      })

  }

}
