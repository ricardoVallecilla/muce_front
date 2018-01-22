import {Routes} from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard-default/dashboard-default.module#DashboardDefaultModule'
      }, {
        path: 'basic',
        loadChildren: './pages/ui-elements/basic/basic.module#BasicModule'
      }, {
        path: 'notifications',
        loadChildren: './pages/ui-elements/advance/notifications/notifications.module#NotificationsModule'
      }, {
        path: 'bootstrap-table',
        loadChildren: './pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module#BasicBootstrapModule',
      }, {
        path: 'map',
        loadChildren: './pages/map/google-map/google-map.module#GoogleMapModule',
      }, {
        path: 'user',
        loadChildren: './pages/user/profile/profile.module#ProfileModule'
      }, {
        path: 'simple-page',
        loadChildren: './pages/simple-page/simple-page.module#SimplePageModule'
      }
    ]
  }, {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
      }
    ]
  }, {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'administracion',
        loadChildren: './pages/administracion/administracion.module#AdministracionModule'
      }
    ]
  }
  , {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'item',
        loadChildren: './pages/items/items.module#ItemModule'
      }
    ]
  }
];
