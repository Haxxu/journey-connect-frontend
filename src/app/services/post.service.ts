import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { createPost as createPostAction } from '@/core/store/me/me.actions';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private store: Store) {}

  createPost(body: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/posts`, body).pipe(
      tap((res: any) => {
        if (res.success) {
          this.store.dispatch(createPostAction({ post: res.data }));
        }
      })
    );
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
