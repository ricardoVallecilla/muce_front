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

    obtenerMovimientos(museoid,first,rows): Observable<any> {
        return this._generalServices.getResources("get", this.url.movimientosMuseo + museoid+"/"+first+"/"+rows)
    }

    obtenerMovimientosPendientes(museoid): Observable<any> {
        return this._generalServices.getResources("get", this.url.movimientosMuseoPendientes + museoid)
    }

    cantidadMovimientos(museoid): Observable<any> {
        return this._generalServices.getResources("get", this.url.cantidadMovimientos + museoid)
    }
    obtenerItemsMovimiento(movimientoid): Observable<any> {
        return this._generalServices.getResources("get", this.url.movimientoPiezas + "/" + movimientoid)
    }

    confirmarMovimiento(movimientoid): Observable<any> {
        return this._generalServices.getResources("get", this.url.confirmarMovimiento + "/" + movimientoid)
    }

    confirmarMovimientoPiezas(movimientoid): Observable<any> {
        return this._generalServices.getResources("get", this.url.confirmarMovimientoPiezas + "/" + movimientoid)
    }

    guardarMovimiento(item): Observable<any> {
        return this._generalServices.getResources("post", this.url.movimientoPiezas, item)
    }
    
    guardarMovimientoDevolucion(item): Observable<any> {
        return this._generalServices.getResources("post", this.url.movimientoPiezasDevolucion, item)
    }

    cargarMovimientoPendientesIngreso(museoid,tipoid): Observable<any> {
        return this._generalServices.getResources("get", this.url.movimientoPendientesIngreso+museoid+"/"+tipoid)
    }

    cargarMovimientoPrestamosInternos(museoid,tipoid): Observable<any> {
        return this._generalServices.getResources("get", this.url.movimientoPrestamosInternos+museoid+"/"+tipoid)
    }

    pendientesgeneral(museoid,listaEstados): Observable<any> {
        let objGuardar={museoid:museoid,estados:listaEstados}
        return this._generalServices.getResources("post", this.url.pendientesgeneral, objGuardar)
    }

}