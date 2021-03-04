import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  addingPlaceSubscription: Subscription;

  constructor(
    private placeService: PlaceService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.generateTheForm();
  }

  private generateTheForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  createOffer() {
    if (!this.form.valid) {
      return;
    }

    this.loadingController
      .create({
        message: 'Creating a place...',
      })
      .then((loadingElement) => {
        loadingElement.present();
        this.addingPlaceSubscription = this.placeService
          .addPlace(
            this.form.value.title,
            this.form.value.description,
            +this.form.value.price,
            new Date(this.form.value.dateFrom),
            new Date(this.form.value.dateTo)
          )
          .subscribe(() => {
            loadingElement.dismiss();
            this.form.reset();
            this.router.navigate(['/places/offers']);
          });
      });
  }

  ngOnDestroy(): void {
    if (this.addingPlaceSubscription) {
      this.addingPlaceSubscription.unsubscribe;
    }
  }
}
