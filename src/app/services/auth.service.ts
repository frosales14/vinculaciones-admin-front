import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/interfaces/login.interface';
import { tap } from 'rxjs';
import {
  CreateStudent,
  Student,
  User,
} from '../models/interfaces/student.interface';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl;

  private user = new BehaviorSubject<Student | null>(null);

  get user$(): Observable<Student> {
    return this.user;
  }

  get studentId() {
    return this.user.value._id;
  }

  login(credentials: LoginCredentials) {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<User>(url, credentials).pipe(
      tap((data) => {
        this.user.next(data.student);
        localStorage.setItem('token', data.token);
      }),
    );
  }

  register(newStudent: CreateStudent): Observable<User> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<User>(url, newStudent).pipe(
      tap((data) => {
        this.user.next(data.student);
        localStorage.setItem('token', data.token);
      }),
    );
  }

  checkToken(): Observable<User> {
    const url = `${this.baseUrl}/auth/check-token`;
    return this.http.get<User>(url).pipe(
      tap((user) => {
        this.user.next(user.student);
      }),
    );
  }
}
