import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFormComponent } from './upload-form/upload-form.component';



@NgModule({
  declarations: [UploadFormComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UploadFormComponent
  ]
})
export class UploaderModule { }
