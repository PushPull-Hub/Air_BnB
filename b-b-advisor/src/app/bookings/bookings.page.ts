import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from '../utils/models/Booking.model';
import { BookingService } from '../utils/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  loadBookingPlacesSubscription: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadBookingPlacesSubscription = this.bookingService.bookings.subscribe(
      (bookingsList) => {
        this.loadedBookings = bookingsList;
      }
    );
  }

  cancelBooking(bookingId: string, slidingElement: IonItemSliding) {
    slidingElement.close();
    this.loadingController
      .create({ message: 'Cancelling...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  ngOnDestroy() {
    this.loadBookingPlacesSubscription.unsubscribe();
  }
}
