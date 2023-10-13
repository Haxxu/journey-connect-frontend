import { CommentsAction } from '@/core/store/comments/comments.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private store: Store) {}

  createComment(
    content: string,
    contextId: string,
    contextType: string = 'post'
  ): Observable<any> {
    return this.http.post(`${environment.apiURL}/comments`, {
      content,
      context_id: contextId,
      context_type: contextType,
    });
  }

  replyComment(
    content: string,
    contextId: string,
    contextType: string = 'post',
    rootComment: string,
    replyUser: string
  ): Observable<any> {
    return this.http.post(`${environment.apiURL}/comments/reply`, {
      content,
      context_id: contextId,
      context_type: contextType,
      root_comment: rootComment,
      reply_user: replyUser,
    });
  }

  updateCommentById(id: string, content: string): Observable<any> {
    return this.http.patch(`${environment.apiURL}/comments/${id}`, {
      content,
    });
  }

  getCommentsByContextId(contextId: string): Observable<any> {
    return this.http
      .get(`${environment.apiURL}/comments`, {
        params: { context_id: contextId },
      })
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.store.dispatch(
              CommentsAction.addContextComments({
                contextId,
                comments: res.data.comments,
                totalComments: res.data.totalComments,
              })
            );
          }
        })
      );
  }
}
