export class InstrumentalCientifico {
    tipobien;
    detalleid;
    especie;
    nombre;
    otradenominacion;
    tecnica;
    fabricante0;
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
    piezamuseableid;

    constructor(piezamuseableid){
        this.piezamuseableid=piezamuseableid
        this.funciona=false;
        this.enuso=false;

    }
}