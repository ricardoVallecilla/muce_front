


export class UrlServices {

    servidor = "http://localhost"
    autorizacion = this.servidor + ":9596";
    proxy = this.servidor + ":9595";

    login = this.autorizacion + "/uaa/oauth/token?grant_type=password"
    token = this.autorizacion + "/uaa/user"

    catalogos=this.proxy+"/catalogo/"
    item=this.proxy+"/item/"
    filtrarItem=this.item+"filtro"
    cantidadItem=this.item+"count"
    cantidadFiltroTexto=this.filtrarItem+"/texto/count"
    filtroTexto=this.filtrarItem+"/texto"
    piezaMuseable=this.proxy+"/piezaMuseable/"
    piezaMuseableByItem=this.piezaMuseable+"item/"
    guardaritemBaja=this.item+"bajas"
    itemBajaByItem=this.item+"bajas/"
    guardarPiezaMuseableDetalle=this.piezaMuseable+"detalle"
    subirFoto=this.piezaMuseable+"foto/tipo"
    guardarCatalogacion=this.piezaMuseable+"catalogacion"
    optenerDetalleInstrumental=this.proxy+"/instrumental/piezaMuseable/"
    optenerDetalleBotanica=this.proxy+"/botanica/piezaMuseable/"
    optenerDetalleArqueologia=this.proxy+"/arquelogica/piezaMuseable/"
    optenerDetalleEntomologia=this.proxy+"/entomologica/piezaMuseable/"
    obtenerDetalleFotografica=this.proxy+"/fotografica/piezaMuseable/"
    obtenerDetalleGeologica=this.proxy+"/geologica/piezaMuseable/"
    obtenerDetallePaleontologica=this.proxy+"/paleontologica/piezaMuseable/"
    obtenerDetalleZoologica=this.proxy+"/zoologica/piezaMuseable/"
    obtenerDetalleArte=this.proxy+"/arte/piezaMuseable/"

    downloadFotografia=this.piezaMuseable+"fotografia/"
    downloadFotografiaTipo=this.piezaMuseable+"detalle/fotografia/"
    estadosBien=this.proxy+"/estadogeneralbien/piezaMuseable/"
    catalogosDetalle=this.proxy+"/piezamuseablecatalogo/piezaMuseable/"

    obtenerCatalogosPadre= this.catalogos+"padres"
    cantidadCatalogosPadre=this.obtenerCatalogosPadre+"/count"    
    obtenerCatalogosHijos= this.catalogos+"hijos/"
    cantidadCatalogosHijos=this.obtenerCatalogosHijos+"count/"
    obtenerCatalogosHijosPorPadres= this.catalogos+"hijos/lista"
    usuarios=this.proxy+"/usuario/"
    optenerUsuarios=this.usuarios
    obtenerUsuariosByRol = this.optenerUsuarios + 'rol' 
    roles=this.proxy+"/rol/"
    optenerRoles=this.roles
    permisos=this.proxy+"/permiso/"
    optenerPermisos=this.permisos
    museo=this.proxy + "/museo/"
    movimientos=this.proxy + "/movimiento/"
    movimientoPiezas=this.movimientos+"piezas"
    movimientoPiezasDevolucion=this.movimientos+"devolucion/piezas"
    movimientosMuseo=this.movimientos+"museo/"
    cantidadMovimientos=this.movimientosMuseo+"count/"
    movimientosMuseoPendientes=this.movimientos+"museo/pendientes/"
    confirmarMovimiento=this.movimientos+"confirmar"
    confirmarMovimientoPiezas=this.movimientos+"confirmar/piezas"
    movimientoPrestamosInternos=this.movimientos+"pendientesDevolucionInterna/"
    movimientoPendientesIngreso=this.movimientos+"pendientesIngreso/"
    movimientosItem=this.movimientos+"pieza/movimientos/"
    guardarMuseoFile = this.museo + 'file'
    pendientesgeneral=this.movimientos+"pendientes/general"
    reporteExposicion=this.item+"/reporteExposicion"
    urlImagen=this.item+"urlImagen"
    reporteGeneral=this.item+"reportegeneral"
    constructor() {

    }



}