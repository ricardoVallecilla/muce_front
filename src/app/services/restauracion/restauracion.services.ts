import { Injectable } from "@angular/core";
import { UrlServices } from "../urls";
import { GeneralService } from "../general/general.service";
import { Observable } from "rxjs";

@Injectable()
export class RestauracionServices {

    url = new UrlServices();

    constructor(private _generalServices: GeneralService) {
        
    }

    obtenerRestauracionByItem(itemid): Observable<any[]> {
        return this._generalServices.getResources("get", this.url.restauracion + 'lista/' + itemid)
    }

    obtenerLastRestauracionByItem(itemid): Observable<any> {
        return this._generalServices.getResources("get", this.url.restauracion + 'last/' + itemid)
    }

    guardarRestauracion(restauracion): Observable<any> {
        return this._generalServices.getResources("post", this.url.restauracion, restauracion)
    }

    obtenerRestauracionById(id): Observable<any> {
        return this._generalServices.getResources("get", this.url.restauracion  + id)
    }
}