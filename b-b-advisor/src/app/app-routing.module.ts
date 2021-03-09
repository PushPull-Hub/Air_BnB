import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationPageModule
          ),
      },
      {
        path: 'places',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./places/places.module').then((m) => m.PlacesPageModule),
      },
      {
        path: 'bookings',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./bookings/bookings.module').then(
            (m) => m.BookingsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
