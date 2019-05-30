import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { RouteGuardService } from '../issue/route-guard.service';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'view/:issueId', component: ViewComponent, canActivate:[RouteGuardService] }
    ])
  ]
})
export class SharedModule { }
