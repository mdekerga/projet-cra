import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { CollabDashboard } from './features/collab-dashboard/collab-dashboard';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard';
import { CraValidationComponent } from './features/cra-validation-component/cra-validation-component';
import { UserManagementComponent } from './features/user-management/user-management';
import { adminGuard, authGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './shared/models/components/admin-layout/admin-layout';
import { MissionManagementComponent } from './features/mission-management/mission-management';
import { NavbarCollabComponent } from './shared/models/components/navbar-collab/navbar-collab';
import { CraSaisie } from './features/cra-saisie/cra-saisie';
import { CollabLayout } from './shared/models/components/collab-layout/collab-layout';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'collab',
    component: CollabLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: CollabDashboard },
      { path: 'cra', component: CraSaisie },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'users', component: UserManagementComponent },
      { path: 'missions', component: MissionManagementComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'validations', component: CraValidationComponent },
      { path: 'cras', component: CraValidationComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
