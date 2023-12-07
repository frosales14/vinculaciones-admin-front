import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token') ?? null;

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  return authService.checkToken().pipe(
    map((user) => {
      localStorage.setItem('token', user.token);
      return true;
    }),
    catchError(() => {
      router.navigateByUrl('/login');
      return of(false);
    }),
  );
};
