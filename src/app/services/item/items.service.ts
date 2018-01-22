import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general/general.service'
import { UrlServices } from '../urls'
@Injectable()
export class ItemService {

    url = new UrlServices();
    constructor(private _generalServices: GeneralService) {
        //  _generalServices.autenticar();
    }

    getUsuarioId() {
        return this._generalServices.getPersonaId();
    }


    filtrarItem(museoId, grupoId, categoriaId): Observable<any> {
        let filtro = {
            "museoId": museoId,
            "grupoId": grupoId,
            "categoriaId": categoriaId
        }
        return this._generalServices.getResources("post", this.url.filtrarItem, filtro)
    }

    piezaMuseableByItem(itemid): Observable<any> {
        return this._generalServices.getResources("get", this.url.piezaMuseableByItem+itemid)
    }

    obtenerCatalogosHijos(padreId): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerCatalogosHijos + padreId)
    }
    guardarItem(item): Observable<any> {
        return this._generalServices.getResources("post", this.url.item, item)
    }
}