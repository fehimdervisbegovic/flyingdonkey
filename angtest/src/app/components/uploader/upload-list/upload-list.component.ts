import { Component, OnInit } from '@angular/core';
import { UploaderService } from 'src/app/services/uploader.service';
import { Observable } from 'rxjs';
import { UploaderFile } from 'src/app/models/uploader-file';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {

  files$: Observable<{}>;

  constructor(private uploader: UploaderService) { }

  ngOnInit() {
    this.files$ = this.uploader.files$;
  }

}
