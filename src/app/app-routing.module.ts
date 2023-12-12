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
        path: 'agregar/:id',
        loadComponent: () =>
          import('./pages/add-vinculacion/add-vinculacion.component').then(
            (c) => c.AddVinculacionComponent,
          ),
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule,
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(
            (m) => m.TablesModule,
          ),
      },
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./demo/chart/apex-chart/apex-chart.component'),
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component'),
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
