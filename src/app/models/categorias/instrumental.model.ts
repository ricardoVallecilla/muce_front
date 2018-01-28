export class InstrumentalCientifico {
    tipobien;
    detalleid;
    especie;
    nombre;
    otradenominacion;
    tecnica;
    fabricante;
    lugarfabricacion;
    alto;
    largo;
    ancho;
    diametro;
    espesor;
    peso;
    inscripciones;
    descripcion;
    enuso: boolean;
    materialid;
    funciona: boolean;
    fechafabricacion
    piezamuseableid;

    constructor(piezamuseableid){
        this.piezamuseableid=piezamuseableid
        this.funciona=false;
        this.enuso=false;

    }
}