import { Injectable } from '@angular/core';
import { Place } from '../models/Place.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private _places: Place[] = [
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
      '10',
      'The Foggy Palace',
      'Not your average city trip!',
      'assets/images/hotel_3.jpg',
      99.99
    ),
  ];

  constructor() {}

  getPlaces() {
    return [...this._places];
  }
}
