import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mission } from '../shared/models/mission.model';

@Injectable({ providedIn: 'root' })
export class MissionService {
  private apiUrl = `${environment.apiUrl}/admin/missions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mission[]> {
    console.table(this.http.get<Mission[]>(this.apiUrl));
    return this.http.get<Mission[]>(this.apiUrl);
  }

  create(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/create`, mission);
  }

  update(id: number, mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${id}`, mission);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
