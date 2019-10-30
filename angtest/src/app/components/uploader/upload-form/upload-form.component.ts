import { Component, OnInit } from '@angular/core';

import { UploaderFile } from 'src/app/models/uploader-file';
import { MessageType } from 'src/app/models/message-type';
import { UploaderService } from 'src/app/services/uploader.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  message: { body: string, type: MessageType };

  uploaderFile: UploaderFile;

  constructor(private uploader: UploaderService) {
    this.uploaderFile = {};
  }

  reset = () => {
    this.message = null;
    this.uploaderFile = {};
  }

  onFileChange = (evt: any) => {

    this.reset();

    const files: FileList = evt.target.files;
    const file = files.item(0);

    this.uploaderFile = {
      file,
      fileSize: `${file.size} bytes`,
      uploadDate: new Date(),
      userUploaded: 'uploader@gmail.com',
      fileName: file.name
    };

    console.log(`File ready for upload: `, this.uploaderFile);
  }

  onUploadFiles = (event) => {

    event.preventDefault();

    // info message
    this.message = { body: `Uploading file ${this.uploaderFile.fileName} please wait ...`, type: MessageType.INFO };

    this.uploader.uploadFile(this.uploaderFile).subscribe(
      res => {
        // success message
        this.message = { body: `File has been successfully uploaded`, type: MessageType.SUCCESS };
        this.uploader.addFile(res);
      }, err => {
        // error message
        this.message = { body: err.error || err.message, type: MessageType.ERROR };
      }
    );
  }

  getMessageClass = () => {
    return {
      'info-message': this.message.type === MessageType.INFO,
      'success-message': this.message.type === MessageType.SUCCESS,
      'error-message': this.message.type === MessageType.ERROR
    };
  }

  ngOnInit() {
  }
}
