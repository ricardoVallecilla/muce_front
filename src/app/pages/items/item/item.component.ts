import { Component, OnInit } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { Item } from '../../../models/item.model'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../services/item/items.service'
import { Message, ConfirmationService } from 'primeng/primeng';
import * as CryptoJS from 'crypto-js';
import { MuseoServices } from '../../../services/museo/museo.services';

@Component({
  selector: 'item',
  templateUrl: './item.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class ItemComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = this.properties.labelLista + this.title;
  msgs: Message[] = [];
  items = [];
  tipoItem = [{ label: this.properties.labelSeleccione, value: null }]
  categoriaItem = [{ label: this.properties.labelSeleccione, value: null }]
  grupoItem = [{ label: this.properties.labelSeleccione, value: null }]
  bandera = 0;
  grupo = null;
  categoria = null;
  item: Item = null;
  detallePiezaMuseable = false;
  museo = null;
  es = this.properties.es;
  verPopUp = false;
  movimientos = [];
  constructor(
    private _catalogoService: CatalogoService,
    private _itemService: ItemService,
    private _museoServices: MuseoServices

  ) {


  }

  ngOnInit() {
    if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.properties.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
      //console.log(persona)
      this.museo = persona.usuario.museoId;
      this.buscarMuseo();
      console.log(this.museo);
    }
    this.cargarCatalogos()
  }

  buscarMuseo() {
    this._museoServices.obtenerMuseosbyId(this.museo.museoid)
      .subscribe((museo: any) => {
        this.museo = museo;
        console.log(this.museo);
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }

  buscar() {
    this.items = []
    this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, this.categoria.catalogoid)
      .subscribe((items: any[]) => {
        this.items = items;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }



  buscarTodos() {
    this.items = []
    this._itemService.filtrarItem(this.museo.museoid)
      .subscribe((items: any[]) => {
        this.items = items;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }



  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoIngreso, this.constantes.grupo])
      .subscribe((catalogos: any[]) => {
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoIngreso).forEach(x => {
          this.tipoItem.push({ label: x.nombre, value: x })
        });
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupo).forEach(x => {
          this.grupoItem.push({ label: x.nombre, value: x })
        });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }

  nuevo() {
    this.msgs = [];
    this.acciones = this.properties.labelNuevo + " Item"
    this.bandera = 1;
    this.item = new Item();
  }

  piezaMuseable(item) {
    this.item = item;
    this.detallePiezaMuseable = true
  }
  obtenerDatoHijo(event) {
    this.detallePiezaMuseable = false
    if (event) {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Item Actualizado.' });
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

  editarItem(item) {
    this.msgs = [];
    if (item.fechaadquisicion) item.fechaadquisicion = new Date(item.fechaadquisicion);
    if (item.fechaingreso) item.fechaingreso = new Date(item.fechaingreso);
    if (item.fecharestaurado) item.fecharestaurado = new Date(item.fecharestaurado);
    if (item.fecharegistro) item.fecharegistro = new Date(item.fecharegistro);
    this.acciones = this.properties.labelActualizar + " Item"
    this.item = item
    this.bandera = 1;
  }

  volver() {
    this.buscar()
    this.bandera = 0;
    this.acciones = this.properties.labelLista + this.title;
  }
  verMovimientos(item) {
    this._itemService.movimientosItem(item.itemid)
      .subscribe((item: any) => {
        this.movimientos = item
        this.verPopUp=true;
        


      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener los movimientos de el Item.' }));
  }
  guardar() {
    this.msgs = [];

    if (this.item.itemid == null) {
      this.item.museoid = this.museo;
      this.item.grupoid = this.grupo;
      this.item.categoriaid = this.categoria

    }

    this._itemService.guardarItem(this.item)
      .subscribe((item: any) => {
        this.item = item
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Item Actualizado.' });
        this.volver()


      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el Item.' }));
  }
}
