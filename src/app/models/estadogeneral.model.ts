export class EstadoBien {


    piezaCatalogoPk: PiezaCatalogoPk;

    constructor(catalogoid) {
        this.piezaCatalogoPk = new PiezaCatalogoPk(catalogoid);
    }

}


export class PiezaCatalogoPk {



    catalogoid: number;
    piezamuseableid: number;


    constructor(catalogoid) {
        this.catalogoid = catalogoid;
    }



}