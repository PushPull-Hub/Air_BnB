import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  pickLocation() {
    this.modalController
      .create({ component: MapModalComponent })
      .then((modalElement) => {
        modalElement.onDidDismiss().then((modalData) => {
          console.log(modalData);
          this._getAdress(
            modalData.data.lat,
            modalData.data.lng
          ).subscribe((data) => console.log(data));
        });
        modalElement.present();
      });
  }

  private _getAdress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map((geoData) => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }
}
