import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '../shared/view/view.component';
import { RouteGuardService } from './route-guard.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

@NgModule({
  declarations: [ListComponent, CreateComponent, NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective,],
  imports: [
    CommonModule,
    FormsModule,
    AngularEditorModule,
    PaginationModule.forRoot(),
    RouterModule.forChild([
      { path: 'list', component: ListComponent, canActivate: [RouteGuardService] },
      { path: 'create', component: CreateComponent, canActivate: [RouteGuardService] },
      { path: 'view/:issueId', component: ViewComponent, canActivate: [RouteGuardService] }
    ])
  ]
})
export class IssueModule { }
