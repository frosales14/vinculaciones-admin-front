import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vinculacion } from '../models/interfaces/vinculacion.interface';
import { AuthService } from './auth.service';

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

  subscribeVinculalacion(vinculacionId) {
    const studentId = this.authService.studentId;
    const url = `${this.baseUrl}/vinculacion/update/students/${vinculacionId}/${studentId}`;
    return this.http.patch<Vinculacion[]>(url, {});
  }
}
