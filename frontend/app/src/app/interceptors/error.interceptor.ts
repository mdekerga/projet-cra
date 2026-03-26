import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('[Error Interceptor] HTTP Error:', error.status, error.message);
      throw error;
    }),
  );
};
