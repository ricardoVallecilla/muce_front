import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AgmCoreModule} from '@agm/core';

export const googleRoutes: Routes = [
  {
    path: '',
    component: GoogleMapComponent,
    data: {
      breadcrumb: 'Google Map',
      icon: 'icofont-map bg-c-pink',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(googleRoutes),
    SharedModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
  ],
  declarations: [GoogleMapComponent]
})
export class GoogleMapModule { }
