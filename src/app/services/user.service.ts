import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private userData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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

  getUserData(): Observable<any> {
    return this.userData$.asObservable();
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/users/${id}`).pipe(
      tap((res: any) => {
        if (res.success) {
          this.userData$.next(res.data);
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
          }
        })
      );
  }
}