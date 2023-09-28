import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmotionService {
  constructor(private http: HttpClient) {}

  getReceivedFriendRequests(): Observable<any> {
    return this.http.get(`${environment.apiURL}/emotions`);
  }

  removeEmotion(context_type: string, context_id: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}/emotions/delete`, {
      body: { context_type, context_id },
    });
  }
}
