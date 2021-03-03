import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Place } from 'src/app/utils/models/Place.model';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  form: FormGroup;
  place: Place;

  constructor(
    private placeService: PlaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadPlaceInformations();
  }

  private loadPlaceInformations() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('placeId')) {
        this.router.navigate['places/offers'];
        return;
      }

      this.placeService
        .getPlaceById(paramMap.get('placeId'))
        .subscribe((place: Place) => {
          if (place) {
            this.place = place;
            this.form = new FormGroup({
              title: new FormControl(this.place.title, {
                updateOn: 'blur',
                validators: [Validators.required],
              }),
              description: new FormControl(this.place.description, {
                updateOn: 'blur',
                validators: [Validators.required],
              }),
            });
          }
        });
    });
  }
}
