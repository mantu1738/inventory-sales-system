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
      }
    ]
  }
];
