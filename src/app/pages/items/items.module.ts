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
  GrowlModule,
  InputTextModule,
  CalendarModule,
  DialogModule,
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
import { EntomologiaComponent } from './piezaMuseable/categorias/entomologia.component';
import { FotografiaComponent } from './piezaMuseable/categorias/fotografia.component';
import { GeologiaComponent } from './piezaMuseable/categorias/geologia.component';
import { PaleontologiaComponent } from './piezaMuseable/categorias/paleontologia.component';
import { ZoologiaComponent } from './piezaMuseable/categorias/zoologia.component';
import { DatosRecoleccionComponent } from './piezaMuseable/datosRecoleccion/datosRecoleccion.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { MovimientosService } from '../../services/movimientos/movimientos.service'
import { ArtesComponent } from './piezaMuseable/categorias/artes.component';
import { FormularioMovimientoComponent } from './movimientos/formulario/formularioMovimiento.component';
import { Seccion2ArqueologiaComponent } from './catalogacion/arqueologia/seccion2.component';
import { CatalogacionComponent } from './catalogacion/catalogacion.component';
import { YacimientoComponent } from './catalogacion/arqueologia/yacimiento.component';
import { Seccion3ArqueologiaComponent } from './catalogacion/arqueologia/seccion3.component';
import { UsoAcademicoComponent } from './catalogacion/usoAcademico.component';
import { Seccion2EntomologiaComponent } from './catalogacion/entomologia/seccion2.component';
import { Seccion3EntomologiaComponent } from './catalogacion/entomologia/seccion3.component';
import { Seccion2InstrumentalComponent } from './catalogacion/instrumental/seccion2.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { BajasComponent } from './bajas/bajas.component';
import { CatalogacionImprimirComponent } from './catalogacion/catalogacionImprimir.component';
import { RestauracionComponent } from './movimientos/restauracion/restauracion.component';
import { Seccion2ArteComponent } from './catalogacion/artes/seccion2.component';
import { Seccion3ArteComponent } from './catalogacion/artes/seccion3.component';
import { Seccion4ArteComponent } from './catalogacion/artes/seccion4.component';
import { Seccion5ArteComponent } from './catalogacion/artes/seccion5.component';



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
          descripcion: "Administración de items y piezas patrimoniales."
        }
      },
      {
        path: 'movimientos',
        component: MovimientosComponent,

        data: {
          breadcrumb: 'Movimientos',
          icon: 'icofont-external bg-c-blue',
          status: true,
          descripcion: "Administración de movimientos de piezas patrimoniales."
        }
      },
      {
        path: 'impresionCatalogacion/:itemId',
        component: CatalogacionImprimirComponent,

        data: {
          breadcrumb: 'Movimientos',
          icon: 'icofont-external bg-c-blue',
          status: true,
          descripcion: "Administración de movimientos de piezas patrimoniales."
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
    GrowlModule,
    InputTextModule,
    InputSwitchModule,
    DialogModule,
    RouterModule.forChild(ItemRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PiezaMuseableComponent,ItemComponent,ArqueologiaComponent,BotanicaComponent,DatosRecoleccionComponent,
     EntomologiaComponent, FotografiaComponent, GeologiaComponent, PaleontologiaComponent, ZoologiaComponent,MovimientosComponent,FormularioMovimientoComponent,
      IstrumentalCientificoComponent, ArtesComponent,Seccion2ArqueologiaComponent,CatalogacionComponent,YacimientoComponent,Seccion3ArqueologiaComponent,
      UsoAcademicoComponent,Seccion2EntomologiaComponent,Seccion3EntomologiaComponent,Seccion2InstrumentalComponent,CatalogacionImprimirComponent,
      BajasComponent, RestauracionComponent, ArtesComponent, Seccion2ArteComponent, Seccion3ArteComponent, Seccion4ArteComponent, Seccion5ArteComponent]
  , providers: [GeneralService, ConfirmationService, CatalogoService, UsuarioService, MuseoServices,ItemService,MovimientosService,MessageService]
})
export class ItemModule { }
