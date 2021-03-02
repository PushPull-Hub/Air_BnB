import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from '../models/Place.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([
    new Place(
      '10',
      'Manhattan Mansion',
      'In the heart of New york city.',
      'assets/images/hotel_1.jpg',
      149.99
    ),
    new Place(
      '11',
      "L'Amour Toujours",
      'Romantic place in Paris.',
      'assets/images/hotel_2.jpg',
      189.99
    ),
    new Place(
      '12',
      'The Peninsula Chicago',
      'Not your average city trip!',
      'assets/images/hotel_3.jpg',
      99.99
    ),
    new Place(
      '13',
      'Marriott.',
      'Start with the customer in mind.',
      'assets/images/hotel_4.jpg',
      59.99
    ),
    new Place(
      '14',
      'Ritz-Carlton Hotel.',
      'Promise authentic hospitality',
      'assets/images/hotel_5.jpg',
      300.0
    ),
    new Place(
      '15',
      'Waldorf Astoria Hotels',
      'Tower Club Lounge',
      'assets/images/hotel_6.jpg',
      140.0
    ),
    new Place(
      '16',
      'The Luxury Collection',
      'Unrivalled facilites and amenities',
      'assets/images/hotel_7.jpg',
      70.0
    ),
    new Place(
      '17',
      'Malibu',
      'made with Amore <3 ',
      'assets/images/hotel_8.jpg',
      120.0
    ),
    new Place(
      '18',
      'Breeze Blows',
      'Not your average city trip!',
      'assets/images/hotel_9.jpg',
      99.99
    ),
  ]);

  constructor() {}

  get places(): Observable<Place[]> {
    return this._places.asObservable();
  }

  getPlaceById(placeId: string): Observable<Place> {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === placeId) };
      })
    );
  }
}
