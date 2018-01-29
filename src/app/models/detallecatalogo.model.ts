export class DetalleCatalogo {


    piezacatalogoPk: PiezaCatalogoPk;
    indetificadorcampo:string;
    constructor(catalogoid,indetificadorcampo) {
        this.piezacatalogoPk = new PiezaCatalogoPk(catalogoid);
        this.indetificadorcampo=indetificadorcampo;
    }

}


export class PiezaCatalogoPk {



    catalogoid: number;
    piezamuseableid: number;


    constructor(catalogoid) {
        this.catalogoid = catalogoid;
    }



}