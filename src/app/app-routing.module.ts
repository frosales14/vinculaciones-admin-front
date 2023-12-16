import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authRoutes } from './auth/auth.routes';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
      },
    ],
  },
  {
    path: 'vinculaciones',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'disponible',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/vinculacion-list/vinculacion-list.component').then(
            (c) => c.VinculacionListComponent,
          ),
      },
      {
        path: 'lista',
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './pages/vinculaciones-list-admin/vinculaciones-list-admin.component'
          ).then((c) => c.VinculacionesListAdminComponent),
      },
      {
        path: 'agregar',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/add-vinculacion/add-vinculacion.component').then(
            (c) => c.AddVinculacionComponent,
          ),
      },
      {
        path: 'editar/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/add-vinculacion/add-vinculacion.component').then(
            (c) => c.AddVinculacionComponent,
          ),
      },
      {
        path: 'recursos',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/resources/resources.component').then(
            (c) => c.ResourcesComponent,
          ),
      },
      {
        path: '**',
        redirectTo: '/vinculaciones',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: GuestComponent,
    children: authRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
