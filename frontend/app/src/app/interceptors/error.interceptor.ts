import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      const isAuthEndpoint =
        req.url.includes('/api/auth/login') || req.url.includes('/api/auth/activate');

      if (error.status === 401 && !isAuthEndpoint) {
        authService.logout();
        router.navigate(['/login'], { queryParams: { reason: 'session-expired' } });
      }

      if (error.status === 403 && req.url.includes('/api/admin') && !isAuthEndpoint) {
        authService.logout();
        router.navigate(['/login'], { queryParams: { reason: 'forbidden' } });
      }

      console.error('[Error Interceptor] HTTP Error:', error.status, error.message);
      return throwError(() => error);
    }),
  );
};
