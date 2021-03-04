import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookingPlacesSubscription = this.bookingService.bookings.subscribe(
      (bookingsList) => {
        this.loadedBookings = bookingsList;
      }
    );
  }

  ngOnDestroy() {
    this.loadBookingPlacesSubscription.unsubscribe();
  }
}
