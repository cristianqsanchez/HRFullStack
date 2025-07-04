import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Position {
  id: number;
  title: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class PositionService {
  private apiUrl = `${environment.apiUrl}/positions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl);
  }

  getById(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.apiUrl}/${id}`);
  }

  create(position: Partial<Position>): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, position);
  }

  update(id: number, position: Partial<Position>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, position);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
