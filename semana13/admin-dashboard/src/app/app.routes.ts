import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'users/register',
    loadComponent: () => import('./views/user-register/user-register.component').then(m => m.UserRegisterComponent)
  },
  {
    path: 'users/list',
    loadComponent: () => import('./views/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
