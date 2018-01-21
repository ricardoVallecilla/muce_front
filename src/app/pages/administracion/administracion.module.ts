import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {UsuarioComponent} from './usuarios/usuarios.component';

import {DataTableModule,
  PanelModule,
  TabViewModule,
  ListboxModule,
  MessagesModule,
  ButtonModule,
  DropdownModule,
  ConfirmDialogModule,
  ConfirmationService,
  InputTextModule,
  InputSwitchModule
} from 'primeng/primeng';

import { BrowserModule } from '@angular/platform-browser';

import {SharedModule} from '../../shared/shared.module';
import {CatalogoService} from '../../services/catalogos/catalogos.service'
import {GeneralService} from '../../services/general/general.service'
import {UsuarioService} from '../../services/usuarios/usuarios.service'
import { MuseoComponent } from './museo/museo.component';
import { MuseoServices } from '../../services/museo/museo.services';

//import {WithSocialComponent} from './registration/with-social/with-social.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'catalogos',
        component: CatalogoComponent,
        
        data: {
          breadcrumb: 'Catalogos',
          icon: 'icofont-sub-listing bg-c-blue',
          status: true,
          descripcion:"Administración de catalogos usados en el sistema."
        }
      }
      ,
      {
        path: 'usuarios',
        component: UsuarioComponent,
        data: {
          breadcrumb: 'Usarios',
          icon: 'icofont-users-alt-2 bg-c-blue',
          status: true,
          descripcion:"Administración de usuarios y asignación de roles."
        }
      },
      {
        path: 'museo',
        component: MuseoComponent,
        data: {
          breadcrumb: 'Museo',
          icon: 'icofont-bank-alt bg-c-blue',
          status: true,
          descripcion:"Administración de museos."
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    
    CommonModule,
    SharedModule,    

    PanelModule, 
    DataTableModule,
    TabViewModule,
    ListboxModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UsuarioComponent,CatalogoComponent, MuseoComponent]
  ,providers:[GeneralService,ConfirmationService,CatalogoService,UsuarioService, MuseoServices]
})
export class AdministracionModule { }
