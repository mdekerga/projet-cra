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
    if (token && !this.isTokenExpired(token)) {
      this.currentUserSubject.next(this.decodeToken(token));
    } else if (token) {
      this.logout();
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
    if (!this.isAuthenticated()) {
      return null;
    }
    const role = this.currentUserSubject.value?.role || null;
    console.log('[AuthService] getRole called, returning:', role);
    return role;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
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

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded?.exp) {
        return true;
      }
      return decoded.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }
}
