import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general/general.service'
import { UrlServices } from '../urls'
@Injectable()
export class UsuarioService {

    url = new UrlServices();

    constructor(private _generalServices: GeneralService) {
      //  _generalServices.autenticar('usuario', 'password');
    }

    optenerUsuarios(): Observable<any> {
        return this._generalServices.getResources("get", this.url.optenerUsuarios)
    }

    optenerRoles(): Observable<any> {
        return this._generalServices.getResources("get", this.url.optenerRoles)
    }

    optenerPermisos(): Observable<any> {
        return this._generalServices.getResources("get", this.url.optenerPermisos)
    }

    actualizarRol(rol): Observable<any> {
        return this._generalServices.getResources("post", this.url.optenerRoles,rol)
    }

    actualizarUsuario(usuario): Observable<any> {
        return this._generalServices.getResources("post", this.url.optenerUsuarios,usuario)
    }

    getRolUsuarioByUserId(rolId): Observable<any> {
        return this._generalServices.getResources('get', this.url.rolUsuario + 'usuario/' + rolId)
    }

    getRolUsuarioByRolId(userId): Observable<any> {
        return this._generalServices.getResources('get', this.url.rolUsuario + 'rol/' + userId)
    }

    asignarRoles(rolesUsuario): Observable<any> {
        const formData = new FormData()
        formData.append('roles', JSON.stringify(rolesUsuario));
        return this._generalServices.getResources('post', this.url.rolUsuario + 'asignar', formData)
    }

  
}