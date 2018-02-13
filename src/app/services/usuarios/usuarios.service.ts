import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general/general.service'
import { UrlServices } from '../urls'
@Injectable()
export class UsuarioService {

    url = new UrlServices();

    constructor(private _generalServices: GeneralService) {
        // _generalServices.autenticar('usuario', 'password');
    }

    optenerUsuarios(): Observable<any> {
        return this._generalServices.getResources("get", this.url.optenerUsuarios)
    }

    obtenerUsuariosByRol(rolId): Observable<any[]> {
        return this._generalServices.getResources("get", this.url.obtenerUsuariosByRol + '/' + rolId)
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


    //     getUsuarioId(){
    //         return this._generalServices.getPersonaId();
    //     }

    //     getUsuarios(rol): Observable<any> {
    //         return this._generalServices.getResources("get", this.url.getAllPersonas)
    //     }


    //     actualizarEstudiante(estudiante): Observable<any> {
    //         return this._generalServices.getResources("post", this.url.actualizarEstudiante,estudiante)
    //     }
    //     enviarCorreInscripcion(estudiante): Observable<any> {
    //         return this._generalServices.getResources("post", this.url.enviarCorreInscripcion,estudiante)
    //     }

    //     getAllPersonasByTipoUsuario(rol): Observable<any> {
    //         return this._generalServices.getResources("get", this.url.getAllPersonasByTipoUsuario + rol)
    //     }

    //     getByNumeroIdentificacion(numero): Observable<any> {
    //         return this._generalServices.getResources("get", this.url.getByNumeroIdentificacion + numero)
    //     }

    //     guardarUsuario(persona, usuario): Observable<any> {
    //         let guardar ={ "persona": persona, "usuario": usuario }

    //         return this._generalServices.getResources("post", this.url.guardarPersonaUsuario, guardar)
    //     }

    //     guardarEstudiante(persona, usuario, estudiante): Observable<any> {
    //         let guardar  = { "persona": persona, "usuario": usuario,"estudiante":estudiante }

    //         return this._generalServices.getResources("post", this.url.guardarPersonaEstudiante, guardar)
    //     }

    //     guardarEstudianteCorreo(persona, usuario, estudiante): Observable<any> {
    //         let guardar  = { "persona": persona, "usuario": usuario,"estudiante":estudiante }

    //         return this._generalServices.getResources("post", this.url.guardarPersonaEstudianteExtranet, guardar)
    //     }


    //     uploadFoto(id,file){
    //         var formData = new FormData();
    //         formData.append('file', file);
    //         formData.append('id', id);
    //         return this._generalServices.getResources("post", this.url.uploadFoto, formData)
    //     }

    //     downloadFoto(id){
    //         return this._generalServices.getResources("getFile", this.url.downloadFoto+"/"+id, )
    //     }

    //     getEstuadianteByPersonaId(id): Observable<any> {
    //         return this._generalServices.getResources("get", this.url.getEstuadianteByPersonaId + id)
    //     }
}