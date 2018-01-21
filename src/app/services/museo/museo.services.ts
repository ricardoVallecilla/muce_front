import { Injectable } from "@angular/core";
import { UrlServices } from "../urls";
import { GeneralService } from "../general/general.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MuseoServices {

    url = new UrlServices();

    constructor(private _generalServices: GeneralService) {
        // _generalServices.autenticar('usuario', 'password');
    }

    obtenerTodoMuseos(): Observable<any[]> {
        return this._generalServices.getResources("get", this.url.museo)
    }

    guardarMuseo(museo): Observable<any>{
        return this._generalServices.getResources("post", this.url.museo, museo)
    }
}