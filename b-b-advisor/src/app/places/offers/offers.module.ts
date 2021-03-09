import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';
import { OfferItemPage } from './offer-item/offer-item.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OffersPageRoutingModule],
  declarations: [OffersPage, OfferItemPage],
})
export class OffersPageModule {}
