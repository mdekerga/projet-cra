import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserSubject.next(this.decodeToken(token));
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        console.log('[AuthService] Login successful, role:', res.role);
        localStorage.setItem('token', res.token);
        this.currentUserSubject.next(this.decodeToken(res.token));
      }),
    );
  }

  logout() {
    console.log('[AuthService] Logout');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private decodeToken(token: string) {
    const decoded: any = jwtDecode(token);
    console.log('[AuthService] Token decoded:', { sub: decoded.sub, role: decoded.role });
    return { email: decoded.sub, role: decoded.role };
  }

  getRole(): string | null {
    const role = this.currentUserSubject.value?.role || null;
    console.log('[AuthService] getRole called, returning:', role);
    return role;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): number {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.userId;
    }
    return 0;
  }

  activate(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/activate`, data);
  }
}
