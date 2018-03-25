import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general/general.service'
import { UrlServices } from '../urls'
@Injectable()
export class CatalogoService {

    url = new UrlServices();
    constructor(private _generalServices: GeneralService) {
        //  _generalServices.autenticar();
    }

    getUsuarioId(){
        return this._generalServices.getPersonaId();
    }

 
    obtenerCatalogosPadre(first,rows): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerCatalogosPadre+"/"+first+"/"+rows)
    }
    cantidadCatalogosPadre(): Observable<any> {
        return this._generalServices.getResources("get", this.url.cantidadCatalogosPadre)
    }

    cantidadCatalogosHijos(padreid): Observable<any> {
        return this._generalServices.getResources("get", this.url.cantidadCatalogosHijos+padreid)
    }

    obtenerCatalogosHijos(padreId,first,rows): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerCatalogosHijos+padreId+"/"+first+"/"+rows)
    }

    obtenerCatalogosHijosPorPadres(padreIds): Observable<any> {
        return this._generalServices.getResources("post", this.url.obtenerCatalogosHijosPorPadres,padreIds)
    }

    guardarCatalogo(catalogo): Observable<any> {
        return this._generalServices.getResources("post", this.url.catalogos,catalogo)
    }
}