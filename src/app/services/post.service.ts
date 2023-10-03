import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  createPost as createPostAction,
  updatePost,
} from '@/core/store/me/me.actions';
import {
  addFeedPost,
  setFeedPosts,
  updateFeedPost,
} from '@/core/store/feed-posts/feed-posts.actions';

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
          this.store.dispatch(addFeedPost({ post: res.data }));
        }
      })
    );
  }

  updatePostById(id: string, body: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/posts/${id}`, body).pipe(
      tap((res: any) => {
        if (res.success) {
          this.store.dispatch(updatePost({ post: res.data }));
          this.store.dispatch(updateFeedPost({ post: res.data }));
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

  getFeedPosts(page: number = 0, pageSize: number = 20): Observable<any> {
    return this.http
      .get(`${environment.apiURL}/posts/feed`, {
        params: { page, pageSize },
      })
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.store.dispatch(setFeedPosts({ posts: res.data.data }));
          }
        })
      );
  }
}
