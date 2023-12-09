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
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(userId1: string, userId2: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/chat`, {
      params: {
        user1: userId1,
        user2: userId2,
      },
    });
  }

  sendMessage(user1: string, user2: string, content: string): Observable<any> {
    return this.http.post(`${environment.apiURL}/messages`, {
      user1,
      user2,
      content,
    });
  }

  deleteMessage(messageId: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}/messages/${messageId}`);
  }

  editMessage(messageId: string, content: string): Observable<any> {
    return this.http.put(`${environment.apiURL}/messages/${messageId}`, {
      content,
    });
  }
}
