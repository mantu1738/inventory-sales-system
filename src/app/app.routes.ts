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
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./components/default-component/default-component').then(m => m.DefaultComponent),
      },
      {
        path:'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { permissions: 'dashboard.view' },
        canActivate: [AuthGuard]
      },
      {
        path:'items',
        loadComponent: () => import('./items/items.component').then(m => m.ItemsComponent),
        canActivate: [AuthGuard],
        data: { permissions: ['item.manage'] }
      },
      {
        path:'users',
        loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
        canActivate: [AuthGuard],
        data: { permissions: ['user.manage'] }
      },
      {
        path:'roles',
        loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent),
        canActivate: [AuthGuard],
        data: { permissions: ['role.manage'] }
      },
      {
        path:'sales',
        loadComponent: () => import('./sales/sales.component').then(m => m.SalesComponent),
        canActivate: [AuthGuard],
        data: { permissions: ['sales.manage'] }
      },
      {
        path:'sales-history',
        loadComponent: () => import('./sales/sales-history/sales-history.component').then(m => m.SalesHistoryComponent),
        canActivate: [AuthGuard],
        data: { permissions: ['sales.manage'] }
      },{
        path:'**',
        loadComponent:() => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
      }

    ]
  }
];
