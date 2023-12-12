import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateVinculacion,
  Vinculacion,
} from '../models/interfaces/vinculacion.interface';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly baseUrl = environment.apiUrl;

  getVinculaciones() {
    const url = `${this.baseUrl}/vinculacion`;
    return this.http.get<Vinculacion[]>(url);
  }

  getVinculacionByID(id: string) {
    const url = `${this.baseUrl}/vinculacion/${id}`;
    return this.http.get(url);
  }

  getAcumulatedHours(id: string): Observable<number> {
    const url = `${this.baseUrl}/vinculacion/students/hours/${id}`;
    return this.http.get<number>(url);
  }

  subscribeVinculalacion(vinculacionId) {
    const studentId = this.authService.studentId;
    const url = `${this.baseUrl}/vinculacion/update/students/${vinculacionId}/${studentId}`;
    return this.http.patch<Vinculacion[]>(url, {});
  }

  createVinculacion(vinculacionData: CreateVinculacion) {
    const url = `${this.baseUrl}/vinculacion`;
    return this.http.post(url, vinculacionData);
  }

  updateVinculacion(id: string, vinculacion: CreateVinculacion) {
    const url = `${this.baseUrl}/vinculacion/${id}`;
    return this.http.patch(url, vinculacion);
  }
}
