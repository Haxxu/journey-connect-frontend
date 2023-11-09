import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  report(
    context_type: 'post' | 'comment',
    context_id: string,
    content: string,
    types: string[]
  ): Observable<any> {
    return this.http.post(`${environment.apiURL}/reports`, {
      context_type,
      context_id,
      content,
      types,
    });
  }

  getReports(
    context_type: 'post' | 'comment',
    page: number = 1,
    pageSize: number = 10,
    search: string = ''
  ): Observable<any> {
    return this.http.get(`${environment.apiURL}/reports`, {
      params: { context_type, page, pageSize, search },
    });
  }
}
