export class Movimiento {
   
    movimientoid;
    tipomovimientoid;
    fechamovimiento;
    fechaingreso
    institucion
    direccion
    pais
    provincia
    ciudad
    telefono
    email
    contacto
    fechainicioprestamo
    fechafinprestamo
    fechaentega
    fechatraspaso
    observaciones
    numeroacta
    numeroseguro
    seguro
    quiendono
    aquiendono
    numerodocbaja
    museodestinoid
    museoemisorid
    entreganombre
    entregacargo
    entregareserva
    entregaci
    receptornombre
    receptorcargo
    receptorreserva
    receptorci
    aseguradora
    valorseguro
    formaenvio
    confirmacion
    fechaconfirmacion
    documentorespaldo
    museoid
    museoreceptorid


    constructor(museoid){
        this.museoid=museoid
        this.fechamovimiento=new Date();

    }
}