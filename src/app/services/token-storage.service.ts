import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  saveAccessToken(access_token: string): void {
    localStorage.removeItem(environment.accessTokenKey);
    localStorage.setItem(environment.accessTokenKey, access_token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(environment.accessTokenKey);
  }

  saveAccessTokenExpire(access_token_expire_date: string): void {
    // localStorage.removeItem(environment.accessTokenExpireKey);
    // localStorage.setItem(
    //   environment.accessTokenExpireKey,
    //   access_token_expire_date
    // );
  }

  clearToken() {
    localStorage.removeItem(environment.accessTokenKey);
    // localStorage.removeItem(environment.accessTokenExpireKey);
  }
}
