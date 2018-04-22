import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WithBgImageComponent} from './login/with-bg-image/with-bg-image.component';
import {WithSocialComponent} from './registration/with-social/with-social.component';
import { GeneralService } from '../../services/general/general.service'
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: WithBgImageComponent,
        data: {
          breadcrumb: 'Login'
        }
      },
      {
        path: 'login/:error',
        component: WithBgImageComponent,
        data: {
          breadcrumb: 'Login'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [WithBgImageComponent, WithSocialComponent],
  providers:[GeneralService]
})
export class AuthenticationModule { }
