import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendService {
  constructor(private http: HttpClient) {}

  generateNewCsvFile(): Observable<any> {
    return this.http.post(`${environment.apiURL}/recommend`, {});
  }

  trainNewModel(): Observable<any> {
    return this.http.post(`${environment.apiURL}/recommend/training`, {});
  }
}
