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
    ciudad
    usuarioregistroid
    fecharegistro
    provincia
    sexo
    tecnicaconservacionid
    piezamuseableid

    constructor(piezamuseableid) {
        this.piezamuseableid = piezamuseableid 
    }
}