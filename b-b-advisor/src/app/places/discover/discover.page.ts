import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/utils/models/Place.model';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[];
  constructor(private placesService: PlaceService) {}

  ngOnInit() {
    this.places = this.placesService.getPlaces();
  }
}
