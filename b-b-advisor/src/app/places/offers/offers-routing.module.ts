import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffersPage } from './offers.page';

const routes: Routes = [
  {
    path: '',
    component: OffersPage,
  },
  {
    path: 'new-offer',
    loadChildren: () =>
      import('./new-offer/new-offer.module').then((m) => m.NewOfferPageModule),
  },
  {
    path: ':placeId',
    loadChildren: () =>
      import('./offer-booking/offer-booking.module').then(
        (m) => m.OfferBookingPageModule
      ),
  },
  {
    path: 'edit/:placeId',
    loadChildren: () =>
      import('./edit-offer/edit-offer.module').then(
        (m) => m.EditOfferPageModule
      ),
  },  {
    path: 'offer-item',
    loadChildren: () => import('./offer-item/offer-item.module').then( m => m.OfferItemPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersPageRoutingModule {}
