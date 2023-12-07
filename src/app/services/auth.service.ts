import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/interfaces/login.interface';
import { tap } from 'rxjs';
import { User } from '../models/interfaces/student.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl;

  login(credentials: LoginCredentials) {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<User>(url, credentials).pipe(
      tap((data) => {
        localStorage.setItem('token', data.token);
      }),
    );
  }
}
