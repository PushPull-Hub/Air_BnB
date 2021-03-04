import { Component, OnInit } from '@angular/core';
import { Booking } from '../utils/models/Booking.model';
import { BookingService } from '../utils/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.bookings.subscribe((bookingsList) => {
      this.loadedBookings = bookingsList;
    });
  }
}
