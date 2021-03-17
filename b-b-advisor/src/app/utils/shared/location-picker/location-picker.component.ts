import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlaceLocation } from '../../models/location.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  isLoading = false;
  selectedLocationImage: string;

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
          if (!modalData.data) {
            return;
          }
          const pickedLocation: PlaceLocation = {
            lat: modalData.data.lat,
            lng: modalData.data.lng,
            address: null,
            staticMapImageUrl: null,
          };
          this.isLoading = true;
          console.log(modalData);
          this._getAdress(modalData.data.lat, modalData.data.lng)
            .pipe(
              switchMap((address: any) => {
                pickedLocation.address = address;
                return of(
                  this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
                );
              })
            )
            .subscribe((staticMapImageUrl: string) => {
              pickedLocation.staticMapImageUrl = staticMapImageUrl;
              this.selectedLocationImage = staticMapImageUrl;
              this.isLoading = false;
            });
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
          console.log(geoData);
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`;
  }
}
