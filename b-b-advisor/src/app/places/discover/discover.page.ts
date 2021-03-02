import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/utils/models/Place.model';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[] = [];
  slicedplaces: Place[] = [];
  placeholders: number[] = [1, 2, 3];
  isDataLoaded: boolean;

  fetchPlacesDataSubscription: Subscription;

  constructor(private placesService: PlaceService) {}

  ngOnInit() {
    this.fetchPlacesDataSubscription = this.fetchPlaces();
  }

  private fetchPlaces() {
    return this.placesService.places.subscribe((places: Place[]) => {
      this.places = places;
      setTimeout(() => {
        this.slicedplaces = [...this.places.slice(1)];
        this.isDataLoaded = true;
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.fetchPlacesDataSubscription.unsubscribe();
  }
}
