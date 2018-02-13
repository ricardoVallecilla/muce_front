import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general/general.service'
import { UrlServices } from '../urls'
@Injectable()
export class MovimientosService {

    url = new UrlServices();
    constructor(private _generalServices: GeneralService) {
        //  _generalServices.autenticar();
    }

    obtenerMovimientos(museoid) : Observable<any> {
        return this._generalServices.getResources("get", this.url.movimientosMuseo+museoid)
    }
    
    obtenerItemsMovimiento(movimientoid) : Observable<any> {
        return this._generalServices.getResources("get", this.url.movimientoPiezas+"/"+movimientoid)
    }

    
    guardarMovimiento(item): Observable<any> {
        return this._generalServices.getResources("post", this.url.movimientoPiezas, item)
    }
   
}