import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
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
        this.userInfo$.next(res.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
      } else {
        console.log(res.message);
      }
    });
  }
}
