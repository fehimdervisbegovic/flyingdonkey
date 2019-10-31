import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploaderFile } from '../models/uploader-file';

@Injectable({
  providedIn: 'root'
})
export class UploaderService implements OnDestroy {

  private files: UploaderFile[];

  public files$: Observable<{}>;
  private filesObserver: BehaviorSubject<{}>;

  constructor(private http: HttpClient) {
    this.files = [];
    this.filesObserver = new BehaviorSubject(null);
    this.files$ = this.filesObserver.asObservable();
  }


  groupByExt(files: UploaderFile[]) {
    const groupedFiles = {};
    for (const iterator of files) {
      if (!groupedFiles[iterator.fileExtension]) {
        groupedFiles[iterator.fileExtension] = [];
      }
      groupedFiles[iterator.fileExtension].push(iterator);
    }
    return groupedFiles;
  }

  addFile(file: UploaderFile) {
    this.files = [...this.files, file];

    // this.filesObserver.next(this.files);
    this.filesObserver.next(this.groupByExt(this.files));
  }

  /**
   * Upload single file to the server
   * @param data File data for upload
   */
  uploadFile(data: UploaderFile): Observable<any> {

    // uploadedDate will be assigned on the server side
    const uploadData = new FormData();
    uploadData.append('file1', data.file, data.fileName);
    uploadData.append('file2', data.file, data.fileName);
    uploadData.append('fileName', data.fileName);
    uploadData.append('userUploaded', data.userUploaded);

    return this.http.post(`${environment.apiUrl}/file`, uploadData);

    // return this.http
    //   .post(`${environment.apiUrl}/file`, uploadData, {
    //     reportProgress: true,
    //     observe: 'events'
    //   })
    //   .pipe(
    //     map((evt) => {
    //       switch (evt.type) {
    //         case HttpEventType.UploadProgress:
    //           const progress = Math.round(100 * evt.loaded / evt.total);
    //           return { status: 'progress', message: progress };
    //         case HttpEventType.Response:
    //           return evt.body;
    //         default:
    //           return evt;
    //       }
    //     })
    //   );
  }

  ngOnDestroy() {
    this.filesObserver.complete();
  }
}
