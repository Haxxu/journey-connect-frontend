import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/register`, user).pipe(
      tap((res: any) => {
        if (res.success) {
          // const token = res.data.access_token;
          // localStorage.setItem('access_token', token);
          // this.userService.fetchUserInfo();
          // this.userService.fetchMyPosts();
        }
      })
    );
  }

  activeAccount(token: string): Observable<any> {
    return this.http
      .post(`${environment.apiURL}/auth/active`, {
        active_token: token,
      })
      .pipe(
        tap((res: any) => {
          if (res.success) {
            const token = res.data.access_token;
            localStorage.setItem('access_token', token);
            this.userService.fetchUserInfo();
            this.userService.fetchMyPosts();
          }
        })
      );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/login`, user).pipe(
      tap((res: any) => {
        if (res.success) {
          const token = res.data.access_token;
          localStorage.setItem('access_token', token);
          this.userService.fetchUserInfo();
          this.userService.fetchMyPosts();
        }
      })
    );
  }

  logout() {
    this.tokenStorageService.clearToken();
    this.router.navigate(['/login']);
  }

  authenticated(): boolean {
    const token = this.tokenStorageService.getAccessToken();
    return !!token;
  }

  checkIsAdmin(): Observable<any> {
    return this.http.get(`${environment.apiURL}/me/is-admin`);
  }
}
