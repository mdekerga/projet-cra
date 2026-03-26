import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CraService {
  private apiUrl = `${environment.apiUrl}/cras`;

  constructor(private http: HttpClient) {}

  generateCRA(userId: number, month: number, year: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, { userId, month, year });
  }

  submitCRA(craId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${craId}/submit`, {});
  }

  getMyDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me/dashboard`);
  }

  submitMyCurrentMonthCra(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/me/submit-current`, {});
  }
}
