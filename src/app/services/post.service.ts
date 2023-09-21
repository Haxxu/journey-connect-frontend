import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(body: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/posts`, body);
  }

  getPostsByUserId(userId: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/posts`).pipe(
      tap((res: any) => {
        if (res.success) {
        }
      })
    );
  }
}
