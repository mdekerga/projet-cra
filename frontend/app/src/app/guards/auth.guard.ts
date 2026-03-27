import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { reason: 'session-expired', returnUrl: state.url } });
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login'], {
      queryParams: { reason: 'session-expired', returnUrl: state.url },
    });
    return false;
  }

  if (authService.getRole() === 'ADMIN') {
    return true;
  }

  router.navigate(['/collab/dashboard']);
  return false;
};
