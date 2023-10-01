import {
  setFriends,
  setReceivedFriendRequests,
} from '@/core/store/friend/friend.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient, private store: Store) {}

  getReceivedFriendRequests(): Observable<any> {
    return this.http
      .get(`${environment.apiURL}/me/received-friend-requests`)
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.store.dispatch(
              setReceivedFriendRequests({
                friendRequests: res?.data?.received_friend_requests,
              })
            );
          }
        })
      );
  }

  acceptFriendRequest(
    userId: string = '',
    type: 'accept' | 'decline' = 'accept'
  ): Observable<any> {
    return this.http
      .put(`${environment.apiURL}/me/friend-request`, { user: userId, type })
      .pipe(
        tap((res: any) => {
          if (res.success) {
          }
        })
      );
  }

  getMyFriends(): Observable<any> {
    return this.http.get(`${environment.apiURL}/me/friends`).pipe(
      tap((res: any) => {
        if (res.success) {
          this.store.dispatch(
            setFriends({
              friends: res?.data,
            })
          );
        }
      })
    );
  }
}
