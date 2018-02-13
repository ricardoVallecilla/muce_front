export class ZoologiaModel {
    
    detalleid
    nombrecientifico
    nombrecomun
    autor
    alto
    largo
    ancho
    diametro
    peso
    inscripciones
    elementosrelacionados
    descripcion
    latitud
    longitud
    localizacionprecisa
    personarecolectadora
    ciudadid
    usuarioregistroid
    fecharegistro
    provinciaid
    cantonid
    sexoid
    paisid
    tecnicaconservacionid
    piezamuseableid

    constructor(piezamuseableid) {
        this.piezamuseableid = piezamuseableid 
    }
}