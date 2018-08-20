import { Component, OnInit } from "@angular/core";
import { Properties } from '../../properties';
import { Constantes } from '../../constantes';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Router } from '../../../../../node_modules/@angular/router';
import { MuseoServices } from "../../../services/museo/museo.services";
import { CatalogoService } from "../../../services/catalogos/catalogos.service";
import { GeneralService } from "../../../services/general/general.service";
import { ItemService } from "../../../services/item/items.service";

@Component({
    selector: 'eliminacion',
    templateUrl: './eliminacion.html'
})
export class EliminacionComponent implements OnInit {

    acciones = "Eliminación"
    properties = new Properties();
    constantes = new Constantes();
    msgs: Message[] = []
    museosItem = [{ label: this.properties.labelSeleccione, value: null }]
    items = [];
    categoriaItem = [{ label: this.properties.labelSeleccione, value: null }]
    grupoItem = [{ label: this.properties.labelSeleccione, value: null }]
    grupo = null;
    item = null
    categoria = null;
    museo = null;
    es = this.properties.es;
    totalRecords = null;
    esfiltroTexto = false;
    textoFiltra = null

    constructor(private _router: Router,
        private _museoServices: MuseoServices,
        private _generalService: GeneralService,
        private confirmationService: ConfirmationService,
        private _itemService: ItemService,
        private _catalogoService: CatalogoService, ) {

    }

    ngOnInit() {
        try {
            this.buscarTodosMuseo()
            this.cargarCatalogos()
        } catch (error) {

            this._router.navigate(['/authentication/login']);
        }
    }

    buscarTodosMuseo() {
        this._museoServices.obtenerTodoMuseos()
            .subscribe((museos: any[]) => {
                museos.forEach(x => {
                    this.museosItem.push({ label: x.nombres.toUpperCase(), value: x })
                })

            }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Museos.' }));
    }

    cargarCatalogos() {
        try {
            this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoIngreso, this.constantes.grupo])
                .subscribe((catalogos: any[]) => {
                    catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupo).forEach(x => {
                        this.grupoItem.push({ label: x.nombre, value: x })
                    });
                }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Catalogos.' }),
                    () => {
                    });
        } catch (error) {

            this._generalService.stopBlock();
            this._router.navigate(['/authentication/login']);
        }
    }

    obtenerCategorias(event) {
        if (event != null) {
            this.grupo = event
        }
        let filtro
        switch (event.catalogoid) {
            case this.constantes.grupoCultural:
                filtro = this.constantes.grupoCulturalPadre;
                break;

            case this.constantes.grupoAdminsitrativo:
                filtro = this.constantes.grupoAdminsitrativoPadre;
                break;
            case this.constantes.grupoTecnologico:
                filtro = this.constantes.grupoTecnologicoPadre;
                break;
        }
        this.categoriaItem = [{ label: this.properties.labelSeleccione, value: null }]
        this._catalogoService.obtenerCatalogosHijosPorPadres([filtro])
            .subscribe((catalogos: any[]) => {
                catalogos.forEach(x => {
                    this.categoriaItem.push({ label: x.nombre, value: x })
                });

            }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Categorias.' }),
                () => {
                });
    }

    buscar() {
        this.items = []
        this.msgs = []
        if (this.grupo) {
            if (this.categoria != null) {
                this._itemService.cantidad(this.museo.museoid, this.grupo.catalogoid, this.categoria.catalogoid)
                    .subscribe((cantidad: number) => {
                        this.totalRecords = cantidad
                        if (cantidad > 0) {
                            this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, this.categoria.catalogoid, 0, this.properties.cantidadRegistros)
                                .subscribe((items: any[]) => {
                                    this.items = items;
                                }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
                        } else {
                            this.items = [];
                        }
                    }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
            }
        }
    }

    loadLazy(event) {
        if (this.grupo != null && this.categoria != null) {


            if (this.esfiltroTexto) {
                this.filtrarItem(event.first, event.rows)
            } else {
                if (this.categoria != null)
                    this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, this.categoria.catalogoid, event.first, event.rows)
                        .subscribe((items: any[]) => {
                            this.items = items;
                        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
                else {
                    if (this.museo != null && this.grupo != null)
                        this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, null, event.first, event.rows)
                            .subscribe((items: any[]) => {
                                this.items = items;
                            }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
                                () => {
                                });
                }
            }
        }
    }



    filtrarItem(first = 0, rows = this.properties.cantidadRegistros) {
        //this.grupo = null
        this.categoria = null
        this.categoriaItem = [{ label: this.properties.labelSeleccione, value: null }]
        this.esfiltroTexto = true;
        if (this.textoFiltra != null)
            this._itemService.cantidadFiltroTexto(this.museo.museoid, this.textoFiltra)
                .subscribe((cantidad: number) => {
                    this.totalRecords = cantidad
                    if (cantidad > 0) {
                        this._itemService.filtroTexto(this.museo.museoid, this.textoFiltra, first, rows)
                            .subscribe((items: any[]) => {
                                this.items = items;
                            }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
                    } else {
                        this.items = [];
                    }

                }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
    }

    editarItem(item) {
        this.msgs = [];
        this.item = item
        this.confirmationService.confirm({
            key: "confirmar",
            message: "¿Está seguro de asignar el registro",
            header: this.properties.titutloPreguntaConfirmacion,
            icon: this.properties.iconAdvertencia,
          });
    }

    eliminar() {
        this._itemService.delete(this.item)
            .subscribe((resl: any) => {
                this.buscar()
            }, (err: any) => {
                console.log(err);
            }, () => {})
    }
}