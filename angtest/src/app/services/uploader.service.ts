import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  constructor(private http: HttpClient) { }

  /**
   * Upload single file to the server
   * @param data File data for upload
   */
  uploadFile(data: any): Observable<any> {
    return this.http
      .post(`http://localhost:xxxx/api/upload`, { data }, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map((evt) => {
          switch (evt.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * evt.loaded / evt.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              return evt.body;
            default:
              return evt;
          }
        })
      );
  }
}
