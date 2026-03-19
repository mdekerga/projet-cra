import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRA } from '../shared/models/cra.model';

@Injectable({ providedIn: 'root' })
export class AdminCraService {
  private apiUrl = 'http://localhost:8080/api/admin/cras';

  constructor(private http: HttpClient) {}

  getSubmittedCRAs(): Observable<CRA[]> {
    return this.http.get<CRA[]>(`${this.apiUrl}/submitted`);
  }

  processCRA(id: number, approved: boolean, reason?: string): Observable<CRA> {
    return this.http.post<CRA>(`${this.apiUrl}/${id}/validate`, {
      approved: approved,
      reason: reason,
    });
  }
}
