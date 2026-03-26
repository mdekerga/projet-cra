import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminSubmittedCra {
  id: number;
  month: number;
  year: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  submittedAt?: string;
  collaboratorFirstName: string;
  collaboratorLastName: string;
  mission: string;
  totalDays: number;
}

@Injectable({ providedIn: 'root' })
export class AdminCraService {
  private apiUrl = `${environment.apiUrl}/admin/cras`;

  constructor(private http: HttpClient) {}

  getSubmittedCRAs(): Observable<AdminSubmittedCra[]> {
    return this.http.get<AdminSubmittedCra[]>(`${this.apiUrl}/submitted`);
  }

  processCRA(id: number, approved: boolean, reason?: string): Observable<AdminSubmittedCra> {
    return this.http.post<AdminSubmittedCra>(`${this.apiUrl}/${id}/validate`, {
      approved: approved,
      reason: reason,
    });
  }
}
