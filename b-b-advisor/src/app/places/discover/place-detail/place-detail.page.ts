import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from 'src/app/utils/models/Place.model';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private placeService: PlaceService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadPlace();
  }

  private loadPlace() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/discover');
        return;
      }
      this.placeService
        .getPlaceById(paramMap.get('placeId'))
        .subscribe((place: Place) => {
          if (place && place.id) {
            this.place = place;
          } else {
            this.navController.navigateBack('/places/discover');
          }
        });
    });
  }
}
