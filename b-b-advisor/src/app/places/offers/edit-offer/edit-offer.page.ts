import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
  private loadPlaceSubscription: Subscription;
  constructor(
    private placeService: PlaceService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.loadPlaceInformations();
  }

  private loadPlaceInformations() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack['places/offers'];
        return;
      }

      this.loadPlaceSubscription = this.placeService
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
                validators: [Validators.required, Validators.maxLength(180)],
              }),
            });
          }
        });
    });
  }

  updateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingController
      .create({
        message: 'Updating place...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placeService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.navController.navigateBack(['/places/offers']);
          });
      });
  }

  ngOnDestroy(): void {
    this.loadPlaceSubscription.unsubscribe();
  }
}
