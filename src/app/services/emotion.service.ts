import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmotionService {
  constructor(private http: HttpClient) {}

  addEmotion(
    context_type: string,
    context_id: string,
    type: string
  ): Observable<any> {
    return this.http.post(`${environment.apiURL}/emotions`, {
      context_type,
      context_id,
      type,
    });
  }

  removeEmotion(context_type: string, context_id: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}/emotions/delete`, {
      body: { context_type, context_id },
    });
  }

  getEmotions(context_type: string, context_id: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/emotions`, {
      params: { context_type, context_id },
    });
  }

  getMyEmotion(context_type: string, context_id: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/me/emotions`, {
      params: { context_type, context_id },
    });
  }
}
