import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CRA, CraEntry } from '../shared/models/cra.model';

@Injectable({ providedIn: 'root' })
export class CraService {
  private readonly apiUrl = 'http://localhost:8080/api/cras';

  currentCra = signal<CRA | null>(null);

  constructor(private http: HttpClient) {}

  getCraByMonth(userId: number, month: number, year: number): Observable<CRA> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http.get<CRA>(`${this.apiUrl}/user/${userId}`, { params }).pipe(
      tap((cra) => this.currentCra.set(cra)),
      catchError((err) => this.handleError(err)),
    );
  }

  saveDraft(craId: number, entries: CraEntry[]): Observable<CRA> {
    return this.http
      .put<CRA>(`${this.apiUrl}/${craId}/entries`, entries)
      .pipe(tap((updated) => this.currentCra.set(updated)));
  }

  submitCRA(craId: number): Observable<void> {
    if (!this.isInsideSubmissionWindow()) {
      return throwError(() => new Error('Fenêtre de soumission fermée (22-28 uniquement).'));
    }
    return this.http.post<void>(`${this.apiUrl}/${craId}/submit`, {});
  }

  isInsideSubmissionWindow(): boolean {
    const today = new Date().getDate();
    return today >= 22 && today <= 28;
  }

  isEditable(cra: CRA): boolean {
    if (cra.status === 'APPROVED') return false;
    if (this.isInsideSubmissionWindow()) return true;
    return cra.status === 'DRAFT' || cra.status === 'REJECTED';
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('Erreur lors de la communication avec le serveur CRA.'));
  }

  getUserHistory(userId: number): Observable<CRA[]> {
    return this.http.get<CRA[]>(`${this.apiUrl}/user/${userId}/history`);
  }
}
