import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map', { static: false }) mapElementRef: ElementRef;
  mapClickEventListner: any;
  googleMaps: any;

  constructor(
    private modalController: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderTheMaps();
  }

  private renderTheMaps(): void {
    this._getGoogleMaps()
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
        const mapElement = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapElement, {
          center: { lat: 40.73061, lng: -73.935242 },
          zoom: 10,
        });
        this.googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapElement, 'visible');
        });
        this.mapClickEventListner = map.addListener('click', (event) => {
          const selectedCordinates = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          this.modalController.dismiss(selectedCordinates);
        });
      })
      .catch((err) => console.error(err));
  }

  private _getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsAPIKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;

        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Maps SDK not available.');
        }
      };
    });
  }

  cancel(): void {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.googleMaps.event.removeListener(this.mapClickEventListner);
  }
}
