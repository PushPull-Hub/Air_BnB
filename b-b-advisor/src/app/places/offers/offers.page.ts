import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/utils/models/Place.model';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  fetchOffersPLacesSubscription: Subscription;

  constructor(private placeService: PlaceService, private router: Router) {}

  ngOnInit() {
    this.fetchOffersPLacesSubscription = this.placeService.places.subscribe(
      (places: Place[]) => (this.offers = places)
    );
  }

  editOffer(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'offers', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy(): void {
    this.fetchOffersPLacesSubscription.unsubscribe();
  }
}
