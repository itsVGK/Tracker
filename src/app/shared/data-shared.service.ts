import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './../app.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  constructor(private appService: AppService, private toastr: ToastrService) {
  }

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userName: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

}
