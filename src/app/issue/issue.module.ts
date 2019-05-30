import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '../shared/view/view.component';
import { RouteGuardService } from './route-guard.service';

@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'list', component: ListComponent, canActivate: [RouteGuardService] },
      { path: 'create', component: CreateComponent, canActivate: [RouteGuardService] },
      { path: 'view/:issueId', component: ViewComponent, canActivate:[RouteGuardService] }
    ])
  ]
})
export class IssueModule { }
