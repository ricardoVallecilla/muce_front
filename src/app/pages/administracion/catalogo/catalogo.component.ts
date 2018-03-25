import { Component, OnInit } from '@angular/core';
import { Properties } from '../../properties'
import { Catalogo } from '../../../models/catalogo.model'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class CatalogoComponent implements OnInit {

  properties = new Properties();
  title = "Catalogos"
  acciones = this.properties.labelLista + this.title;
  msgs: Message[] = [];
  catalogos = [];
  padre = true;
  bandera = 0;
  catalogo = null;
  catalogoPadre = null;
  totalRecords = null;
  constructor(private _catalogoService: CatalogoService) { }

  ngOnInit() {

    this.cargarCatalogos()
  }

  cargarCatalogos(first = 0, rows = this.properties.cantidadRegistros) {
    this._catalogoService.cantidadCatalogosPadre()
      .subscribe((cantidad: number) => {
        this.totalRecords = cantidad;
        
        this._catalogoService.obtenerCatalogosPadre(first, rows)
          .subscribe((catalogos: any[]) => {
            this.catalogos = [];
            this.catalogos = catalogos;
          }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Catalogos.' }));
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Catalogos.' }));

  }

  nuevo() {
    this.msgs = [];
    this.acciones = this.properties.labelNuevo + " Catalogo"
    this.bandera = 1;
    this.catalogo = new Catalogo();
  }

  subCatalogos(catalogo, gb = null, first = 0, rows = this.properties.cantidadRegistros) {

    if (gb != null) gb.value = "";
    this.msgs = [];
    this.padre = false;
    this.catalogoPadre = catalogo;

    this._catalogoService.cantidadCatalogosHijos(this.catalogoPadre.catalogoid)
      .subscribe((cantidad: number) => {
        this.totalRecords = cantidad;
        this._catalogoService.obtenerCatalogosHijos(catalogo.catalogoid, first, rows)
          .subscribe((catalogos: any[]) => {
            this.catalogos = [];
            this.catalogos = catalogos;
          }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Catalogos.' }),
            () => {
              this.bandera = 0;
            });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Catalogos.' }));

  }

  loadLazy(event) {
    
    if (this.padre)
      this.cargarCatalogos(event.first, event.rows);
    else
      this.subCatalogos(this.catalogoPadre, null, event.first, event.rows);

  }
  editarCatalogo(catalogo) {
    this.msgs = [];
    this.acciones = this.properties.labelActualizar + " Catalogo"
    this.catalogo = catalogo
    this.bandera = 1;
  }

  volver() {
    this.cargarCatalogos()
    this.bandera = 0;
    this.padre = true;
    this.acciones = this.properties.labelLista + this.title;
  }

  guardar() {
    this.msgs = [];
    if (!this.padre) {
      this.catalogo.catalogopadreid = this.catalogoPadre;
    }
    this._catalogoService.guardarCatalogo(this.catalogo)
      .subscribe((catalogo: any) => {
        this.catalogo = catalogo
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Catalago Actualizado.' });
        if (!this.padre) {
          this.subCatalogos(this.catalogoPadre)
        } else {
          this.volver();
        }


      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el Catalogo.' }),
        () => {
        });
  }
}
