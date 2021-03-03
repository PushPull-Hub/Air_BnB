import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.fetchOffersPLacesSubscription = this.placeService.places.subscribe(
      (places: Place[]) => (this.offers = places)
    );
  }

  ngOnDestroy(): void {
    this.fetchOffersPLacesSubscription.unsubscribe();
  }
}
