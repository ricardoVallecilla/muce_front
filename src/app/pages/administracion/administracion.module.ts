import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {DataTableModule,PanelModule} from 'primeng/primeng';
import {SharedModule} from '../../shared/shared.module';

//import {WithSocialComponent} from './registration/with-social/with-social.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'catalogo',
        component: CatalogoComponent,
        
        data: {
          breadcrumb: 'Catalogo',
          icon: 'icofont-layout bg-c-blue',
          status: true,
          descripcion:"Administración de catalogos usados en el sistema."
        }
      }
      // ,
      // {
      //   path: 'registration',
      //   component: WithSocialComponent,
      //   data: {
      //     breadcrumb: 'Registration'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PanelModule,
    DataTableModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CatalogoComponent]
})
export class AdministracionModule { }
