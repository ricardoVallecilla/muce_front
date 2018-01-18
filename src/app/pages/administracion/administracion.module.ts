import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {UsuarioComponent} from './usuarios/usuarios.component';
import {DataTableModule,PanelModule,TabViewModule,ListboxModule,ButtonModule} from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';

import {SharedModule} from '../../shared/shared.module';
import {CatalogoService} from '../../services/catalogos/catalogos.service'
import {GeneralService} from '../../services/general/general.service'
import {UsuarioService} from '../../services/usuarios/usuarios.service'

//import {WithSocialComponent} from './registration/with-social/with-social.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'catalogos',
        component: CatalogoComponent,
        
        data: {
          breadcrumb: 'Catalogo',
          icon: 'icofont-layout bg-c-blue',
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
          icon: 'icofont-layout bg-c-blue',
          status: true,
          descripcion:"Administración de usuarios y asignación de roles."
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    
    CommonModule,
    SharedModule,    
    PanelModule, DataTableModule,TabViewModule,ListboxModule,ButtonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UsuarioComponent,CatalogoComponent]
  ,providers:[GeneralService,CatalogoService,UsuarioService]
})
export class AdministracionModule { }
