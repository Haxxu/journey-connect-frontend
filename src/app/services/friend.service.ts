import {
  setFriends,
  setReceivedFriendRequests,
  setSentFriendRequests,
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
                friendRequests: res?.data,
              })
            );
          }
        })
      );
  }

  getSentFriendRequests(): Observable<any> {
    return this.http.get(`${environment.apiURL}/me/sent-friend-requests`).pipe(
      tap((res: any) => {
        if (res.success) {
          this.store.dispatch(
            setSentFriendRequests({
              friendRequests: res?.data,
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

  addFriend(userId: string): Observable<any> {
    return this.http.post(`${environment.apiURL}/me/add-friend`, {
      user: userId,
    });
  }

  unfriend(userId: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}/me/unfriend`, {
      body: { user: userId },
    });
  }

  cancelFriendRequest(userId: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}/me/cancel-friend-request`, {
      body: { user: userId },
    });
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

  checkIsFriend(userId: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/me/is-friend`, {
      params: { userId },
    });
  }

  checkFriendStatus(userId: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/me/friend-status`, {
      params: { userId },
    });
  }

  responsePendingRequest(
    userId: string,
    type: 'accept' | 'decline' = 'accept'
  ): Observable<any> {
    return this.http.put(`${environment.apiURL}/me/friend-request`, {
      user: userId,
      type,
    });
  }
}
