import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { CollabDashboardComponent } from './features/collab-dashboard/collab-dashboard';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard';
import { CraValidationComponent } from './features/cra-validation-component/cra-validation-component';
import { UserManagementComponent } from './features/user-management/user-management';
import { adminGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: CollabDashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'users', component: UserManagementComponent },
      { path: 'cras', component: CraValidationComponent },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
