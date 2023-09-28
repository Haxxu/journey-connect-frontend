import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '@environments/environment';

import { Store } from '@ngrx/store';
import { setMyPosts, updateMeInfo } from '@/core/store/me/me.actions';
import { setUserProfileData } from '@/core/store/user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private userData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private store: Store) {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      this.userInfo$.next(JSON.parse(storedUserInfo));
    }
  }

  getUserInfo(): Observable<any> {
    return this.userInfo$.asObservable();
  }

  fetchUserInfo(): void {
    this.http.get(`${environment.apiURL}/me/info`).subscribe((res: any) => {
      if (res.success) {
        // this.userInfo$.next(res.data);
        this.store.dispatch(updateMeInfo({ meInfo: res.data }));
        // localStorage.setItem('userInfo', JSON.stringify({ meInfo: res.data }));
      } else {
        console.log(res.message);
      }
    });
  }

  fetchMyPosts(): void {
    this.http.get(`${environment.apiURL}/me/posts`).subscribe((res: any) => {
      if (res.success) {
        this.store.dispatch(setMyPosts({ posts: res.data }));
      } else {
        console.log(res.message);
      }
    });
  }

  getUserData(): Observable<any> {
    return this.userData$.asObservable();
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/users/${id}`).pipe(
      tap((res: any) => {
        if (res.success) {
          this.store.dispatch(setUserProfileData({ user: res.data }));
        }
      })
    );
  }

  updateMyImage(type: 'avatar' | 'background', media: any): Observable<any> {
    return this.http
      .put(
        `${environment.apiURL}/me/update-image`,
        { media },
        {
          params: {
            type,
          },
        }
      )
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.userData$.next(res.data);
            this.store.dispatch(updateMeInfo({ meInfo: res.data }));
            this.store.dispatch(setUserProfileData({ user: res.data }));
          }
        })
      );
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/users/${userId}`, user).pipe(
      tap((res: any) => {
        if (res.success) {
          this.store.dispatch(updateMeInfo({ meInfo: res.data }));
          this.store.dispatch(setUserProfileData({ user: res.data }));
        }
      })
    );
  }
}
