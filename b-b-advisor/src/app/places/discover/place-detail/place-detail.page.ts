import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from 'src/app/utils/models/Place.model';
import { AuthenticationService } from 'src/app/utils/services/authentication.service';
import { BookingService } from 'src/app/utils/services/booking.service';
import { PlaceService } from 'src/app/utils/services/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable: boolean;
  loadPlaceSubscription: Subscription;
  bookPlaceSubscription: Subscription;

  constructor(
    private placeService: PlaceService,
    private bookingService: BookingService,
    private authenticationService: AuthenticationService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.isBookable = false;
    this.loadPlace();
  }

  private loadPlace() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/discover');
        return;
      }
      this.loadPlaceSubscription = this.placeService
        .getPlaceById(paramMap.get('placeId'))
        .subscribe((place: Place) => {
          if (place && place.id) {
            this.place = place;
            this.isBookable =
              place.userId !== this.authenticationService.userId;
          } else {
            this.navController.navigateBack('/places/discover');
          }
        });
    });
  }

  bookPlace() {
    this.actionSheetController
      .create({
        header: 'choose a booking mode',
        buttons: [
          {
            text: 'Select a Date',
            handler: () => this.openBookingModal('select'),
          },
          {
            text: 'Random Date',
            handler: () => this.openBookingModal('random'),
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetElement) => {
        actionSheetElement.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode },
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingController
            .create({
              message: 'Booking place ...',
            })
            .then((loadingElement) => {
              loadingElement.present();
              const data = resultData.data.bookingData;
              this.bookPlaceSubscription = this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingElement.dismiss();
                  this.isBookable = false;
                  this.navController.navigateBack('/bookings');
                });
            });
        }
      });
  }

  ngOnDestroy() {
    this.loadPlaceSubscription.unsubscribe();
    if (this.bookPlaceSubscription) {
      this.bookPlaceSubscription.unsubscribe();
    }
  }
}
