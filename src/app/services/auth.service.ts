import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/register`, user).pipe(
      tap((res: any) => {
        if (res.success) {
          const token = res.data.access_token;
          localStorage.setItem('access_token', token);
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
}
