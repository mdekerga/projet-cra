import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    console.log(
      '[JWT Interceptor] Token found, adding Authorization header for:',
      req.method,
      req.url,
    );
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  console.log('[JWT Interceptor] No token found for:', req.method, req.url);
  return next(req);
};
