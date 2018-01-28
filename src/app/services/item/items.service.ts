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
        return this._generalServices.getResources("get", this.url.piezaMuseableByItem + itemid)
    }

    guardarPiezaMuseableDetalle(tipo, detalle, file, estado = null): Observable<any> {
        var formData = new FormData();
        formData.append('file', file[0]);
        formData.append('tipo', tipo);
        formData.append('detalle', JSON.stringify(detalle));
        formData.append('estadoGeneral', null);
        return this._generalServices.getResources("post", this.url.guardarPiezaMuseableDetalle, formData)

    }

    downloadFotografia(id){
        return this._generalServices.getResources("getFile", this.url.downloadFotografia+id, )
    }
    obtenerCatalogosHijos(padreId): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerCatalogosHijos + padreId)
    }
    guardarItem(item): Observable<any> {
        return this._generalServices.getResources("post", this.url.item, item)
    }
    optenerDetalle(tipo, piezaMuseableId): Observable<any> {
        switch (tipo) {
            case 6:
                return this._generalServices.getResources("get", this.url.optenerDetalleInstrumental+piezaMuseableId);
        }

        // return this._generalServices.getResources("post", this.url.item, item)
    }
}