import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general/general.service'
import { UrlServices } from '../urls'
@Injectable()
export class CatalogoService {

    url = new UrlServices();
    constructor(private _generalServices: GeneralService) {
        // _generalServices.autenticar();
    }

    getUsuarioId(){
        return this._generalServices.getPersonaId();
    }

 
    obtenerCatalogosPadre(): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerCatalogosPadre)
    }
}