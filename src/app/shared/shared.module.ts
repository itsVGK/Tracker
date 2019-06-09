import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { RouteGuardService } from '../issue/route-guard.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularEditorModule,
    FileUploadModule,
    ScrollingModule,
    RouterModule.forChild([
      { path: 'view/:issueId', component: ViewComponent, canActivate: [RouteGuardService] }
    ]),
  ],
  exports: []
})
export class SharedModule { }
