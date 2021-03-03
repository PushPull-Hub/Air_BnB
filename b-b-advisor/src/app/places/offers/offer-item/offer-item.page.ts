import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/utils/models/Place.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.page.html',
  styleUrls: ['./offer-item.page.scss'],
})
export class OfferItemPage implements OnInit {
  @Input() offer: Place;

  constructor() {}

  ngOnInit() {}
}
