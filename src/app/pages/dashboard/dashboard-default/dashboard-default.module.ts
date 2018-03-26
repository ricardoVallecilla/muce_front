import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDefaultComponent } from './dashboard-default.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { MovimientosService } from '../../../services/movimientos/movimientos.service';
import {
  DataTableModule,
  PanelModule,
  TabViewModule,
  ListboxModule,
  MessagesModule,
  ButtonModule,
  DropdownModule,
  ConfirmDialogModule,
  FieldsetModule,
  CheckboxModule,
  RadioButtonModule,
  ConfirmationService,  
  InputTextModule,
  CalendarModule,
  DialogModule,
  InputSwitchModule
} from 'primeng/primeng';
import { MuseoServices } from '../../../services/museo/museo.services';
import { GeneralService } from '../../../services/general/general.service';
import { FormsModule } from '@angular/forms';
export const DashboardDefaultRoutes: Routes = [
  {
    path: '',
    component: DashboardDefaultComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardDefaultRoutes),
    SharedModule,
    ChartModule,
    CalendarModule,
    PanelModule,
    DataTableModule,
    TabViewModule,
    ListboxModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,    
    ConfirmDialogModule,
    MessagesModule,
    ButtonModule,
    FieldsetModule,
    InputTextModule,
    InputSwitchModule,
    FormsModule,
    DialogModule,
  ],
  declarations: [DashboardDefaultComponent],
  providers:[MovimientosService,MuseoServices,GeneralService,]
})
export class DashboardDefaultModule { }
