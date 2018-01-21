


export class UrlServices {

    servidor = "http://localhost"
    autorizacion = this.servidor + ":9596";
    proxy = this.servidor + ":9595";

    login = this.autorizacion + "/uaa/oauth/token?grant_type=password"
    token = this.autorizacion + "/uaa/user"

    catalogos=this.proxy+"/catalogo/"
    obtenerCatalogosPadre= this.catalogos+"padres"
    obtenerCatalogosHijos= this.catalogos+"hijos/"
    usuarios=this.proxy+"/usuario/"
    optenerUsuarios=this.usuarios
    roles=this.proxy+"/rol/"
    optenerRoles=this.roles
    permisos=this.proxy+"/permiso/"
    optenerPermisos=this.permisos
    museo=this.proxy + "/museo/"
    constructor() {

    }



}