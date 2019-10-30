import { Component, OnInit } from '@angular/core';
import { UploaderService } from 'src/app/services/uploader.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  form: any;
  message: string;
  error: any;

  constructor(private uploader: UploaderService) { }

  onFileChange = (evt: File) => {
    //
    console.log(`File changed: `, evt);
  }

  onUploadFiles = () => {
    const files = new FormData();
    files.append('file', this.form.get('avatar').value);

    this.uploader.uploadFile(files).subscribe(
      res => this.message = res, err => this.error = err
    );
  }

  ngOnInit() {
  }

}
