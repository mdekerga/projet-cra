import { Routes } from '@angular/router';

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
