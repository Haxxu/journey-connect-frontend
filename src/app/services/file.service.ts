import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.apiURL}/files/upload-file`, formData);
  }

  deleteFile(mediaId: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}/files/delete-file`, {
      body: { id: mediaId },
    });
  }
}
