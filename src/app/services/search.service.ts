import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/users/search`, {
      params: { query },
    });
  }
}
