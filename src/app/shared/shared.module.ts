import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { RouteGuardService } from '../issue/route-guard.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FileSelectDirective, FileUploadModule, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularEditorModule,
    FileUploadModule,
    RouterModule.forChild([
      { path: 'view/:issueId', component: ViewComponent, canActivate: [RouteGuardService] }
    ])
  ]
})
export class SharedModule { }
