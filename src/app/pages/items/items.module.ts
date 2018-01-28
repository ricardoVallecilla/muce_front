import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
  InputSwitchModule
} from 'primeng/primeng';

import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../../shared/shared.module';
import { CatalogoService } from '../../services/catalogos/catalogos.service'
import { GeneralService } from '../../services/general/general.service'
import { UsuarioService } from '../../services/usuarios/usuarios.service'
import { ItemComponent } from './item/item.component';
import { IstrumentalCientificoComponent } from './piezaMuseable/categorias/istrumentalCientifico.component';
import { PiezaMuseableComponent } from './piezaMuseable/piezaMuseable.component';
import { MuseoServices } from '../../services/museo/museo.services';
import { ItemService } from '../../services/item/items.service'
import { ArqueologiaComponent } from './piezaMuseable/categorias/arqueologia.component';
import { BotanicaComponent } from './piezaMuseable/categorias/botanica.component';



//import {WithSocialComponent} from './registration/with-social/with-social.component';

export const ItemRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'item',
        component: ItemComponent,

        data: {
          breadcrumb: 'Item',
          icon: 'icofont-clip-board bg-c-blue',
          status: true,
          descripcion: "Administración de catalogos usados en el sistema."
        }
      }
      // ,
      // {
      //   path: 'usuarios',
      //   component: UsuarioComponent,
      //   data: {
      //     breadcrumb: 'Usarios',
      //     icon: 'icofont-users-alt-2 bg-c-blue',
      //     status: true,
      //     descripcion:"Administración de usuarios y asignación de roles."
      //   }
      // },
      // {
      //   path: 'museo',
      //   component: MuseoComponent,
      //   data: {
      //     breadcrumb: 'Museo',
      //     icon: 'icofont-bank-alt bg-c-blue',
      //     status: true,
      //     descripcion:"Administración de museos."
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [

    CommonModule,
    SharedModule,
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
    RouterModule.forChild(ItemRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PiezaMuseableComponent,ItemComponent,ArqueologiaComponent,BotanicaComponent, IstrumentalCientificoComponent]
  , providers: [GeneralService, ConfirmationService, CatalogoService, UsuarioService, MuseoServices,ItemService]
})
export class ItemModule { }
