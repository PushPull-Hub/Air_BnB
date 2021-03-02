import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/utils/models/Place.model';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[] = [];
  slicedplaces: Place[] = [];
  placeholders: number[] = [1, 2, 3];
  isDataLoaded: boolean;

  constructor(private placesService: PlaceService) {}

  ngOnInit() {
    this.places = this.placesService.getPlaces();
    setTimeout(() => {
      this.slicedplaces = [...this.places.slice(1)];
      this.isDataLoaded = true;
    }, 1000);
  }

  ionViewWillEnter() {}
}
