import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SkeletonTextComponent } from './skeleton-text/skeleton-text.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';

@NgModule({
  declarations: [
    SkeletonTextComponent,
    MapModalComponent,
    LocationPickerComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [SkeletonTextComponent, MapModalComponent, LocationPickerComponent],
  entryComponents: [MapModalComponent],
})
export class SharedModule {}
