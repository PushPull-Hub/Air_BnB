import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/Booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor() {}

  get bookings() {
    return this._bookings.asObservable();
  }
}
