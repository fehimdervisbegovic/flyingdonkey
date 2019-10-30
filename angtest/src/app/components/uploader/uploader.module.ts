import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadListComponent } from './upload-list/upload-list.component';



@NgModule({
  declarations: [
    UploadFormComponent,
    UploadListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UploadFormComponent, UploadListComponent
  ]
})
export class UploaderModule { }
