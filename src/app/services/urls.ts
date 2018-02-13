


export class UrlServices {

    servidor = "http://localhost"
    autorizacion = this.servidor + ":9596";
    proxy = this.servidor + ":9595";

    login = this.autorizacion + "/uaa/oauth/token?grant_type=password"
    token = this.autorizacion + "/uaa/user"

    catalogos=this.proxy+"/catalogo/"
    item=this.proxy+"/item/"
    filtrarItem=this.item+"filtro"
    piezaMuseable=this.proxy+"/piezaMuseable/"
    piezaMuseableByItem=this.piezaMuseable+"item/"
    guardarPiezaMuseableDetalle=this.piezaMuseable+"detalle"
    optenerDetalleInstrumental=this.proxy+"/instrumental/piezaMuseable/"
    optenerDetalleBotanica=this.proxy+"/botanica/piezaMuseable/"
    optenerDetalleArqueologia=this.proxy+"/arquelogica/piezaMuseable/"
    optenerDetalleEntomologia=this.proxy+"/entomologica/piezaMuseable/"
    downloadFotografia=this.piezaMuseable+"fotografia/"
    estadosBien=this.proxy+"/estadogeneralbien/piezaMuseable/"
    catalogosDetalle=this.proxy+"/piezamuseablecatalogo/piezaMuseable/"

    obtenerCatalogosPadre= this.catalogos+"padres"
    obtenerCatalogosHijos= this.catalogos+"hijos/"
    obtenerCatalogosHijosPorPadres= this.catalogos+"hijos/lista"
    usuarios=this.proxy+"/usuario/"
    optenerUsuarios=this.usuarios
    obtenerUsuariosByRol = this.optenerUsuarios + 'rol' 
    roles=this.proxy+"/rol/"
    optenerRoles=this.roles
    permisos=this.proxy+"/permiso/"
    optenerPermisos=this.permisos
    museo=this.proxy + "/museo/"
<<<<<<< HEAD
    movimientos=this.proxy + "/movimiento/"
    movimientoPiezas=this.movimientos+"piezas"
    movimientosMuseo=this.movimientos+"museo/"
=======
    guardarMuseoFile = this.museo + 'file'
>>>>>>> 3e8aef1308be29a1550cdc698772f7e9f86ea2db
    constructor() {

    }



}