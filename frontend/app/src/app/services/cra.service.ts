import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CraService {
  private apiUrl = 'http://localhost:8080/api/cras';

  constructor(private http: HttpClient) {}

  generateCRA(userId: number, month: number, year: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, null, {
      params: { userId, month, year },
    });
  }

  submitCRA(craId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${craId}/submit`, {});
  }
}
