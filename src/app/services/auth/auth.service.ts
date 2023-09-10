import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/login`, user);
  }
}