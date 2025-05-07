import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';

export const routes: Routes = [
  {
      path:'login',
      component:LoginComponent,
  },
  {
    path:'',
    canActivate:[AuthGuard],
    component:ContainerComponent,
    children:[
      {
        path:'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path:'items',
        loadComponent: () => import('./items/items.component').then(m => m.ItemsComponent),
      },
      {
        path:'users',
        loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
      },
      {
        path:'roles',
        loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent),
      },
      {
        path:'sales',
        loadComponent: () => import('./sales/sales.component').then(m => m.SalesComponent),
      }
    ]
  }
];
