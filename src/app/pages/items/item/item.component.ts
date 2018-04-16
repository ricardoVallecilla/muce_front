import { Component, OnInit } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { Item } from '../../../models/item.model'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../services/item/items.service'
import { Message, ConfirmationService } from 'primeng/primeng';
import * as CryptoJS from 'crypto-js';
import { MuseoServices } from '../../../services/museo/museo.services';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general/general.service';

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
  catalogacion = false;
  baja=false
  museo = null;
  es = this.properties.es;
  verPopUp = false;
  movimientos = [];
  totalRecords = null;
  filtrarMuseos = false;
  esfiltroTexto = false;
  textoFiltra = null
  museosItem = [{ label: this.properties.labelSeleccione, value: null }]
  esAdmin=false;
  constructor(
    private _generalService: GeneralService,
    private _router: Router,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService,
    private _museoServices: MuseoServices

  ) {


  }

  ngOnInit() {
    if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.properties.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))

      this.museo = persona.usuario.museoId;
      if (persona.usuario.rolId.rolid == this.constantes.rolAdministrador || persona.usuario.rolId.rolid == this.constantes.rolDirector) {
        this.filtrarMuseos = true;
        this.buscarTodosMuseo();
      } else {
        this.buscarMuseo();
      }


    }
    this.cargarCatalogos()
  }

  buscarMuseo() {
    this._museoServices.obtenerMuseosbyId(this.museo.museoid)
      .subscribe((museo: any) => {
        this.museo = museo;
console.log(this.museo);

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
  }

  buscarTodosMuseo() {
    this._museoServices.obtenerTodoMuseos()
      .subscribe((museos: any[]) => {
        museos.forEach(x => {
          this.museosItem.push({ label: x.nombres.toUpperCase(), value: x })
        })

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
  }

  buscar() {
    this.esfiltroTexto = false;
    this.textoFiltra = null;
    this.items = []

    if (this.categoria != null) {
      this._itemService.cantidad(this.museo.museoid, this.grupo.catalogoid, this.categoria.catalogoid)
        .subscribe((cantidad: number) => {
          this.totalRecords = cantidad
          if (cantidad > 0) {
            this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, this.categoria.catalogoid, 0, this.properties.cantidadRegistros)
              .subscribe((items: any[]) => {
                this.items = items;
              }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
          }else{
            this.items=[];
          }

        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));


    } else
      this.buscarTodos();
  }

  loadLazy(event) {
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

  filtrarItem(first=0,rows=this.properties.cantidadRegistros) {
    this.grupo = null
    this.categoria=null
    this.categoriaItem=[{ label: this.properties.labelSeleccione, value: null }]
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
          }else{
            this.items=[];
          }

        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
  }

  buscarTodos() {
    this.items = []
    this._itemService.cantidad(this.museo.museoid, this.grupo.catalogoid)
      .subscribe((cantidad: number) => {
        this.totalRecords = cantidad
        if (cantidad > 0) {
          this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, null, 0, this.properties.cantidadRegistros)
            .subscribe((items: any[]) => {
              this.items = items;
            }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
        }else{
          this.items=[];
        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));


  }



  cargarCatalogos() {
    try {
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
    } catch (error) {
      
      this._generalService.stopBlock();
      this._router.navigate(['/authentication/login']);
    }

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
    this.catalogacion = false;
    this.baja=false;
  }
  verCatalogacion(item) {
    this.item = item;
    this.detallePiezaMuseable = false
    this.catalogacion = true;
    this.baja=false;
  }
  verFormBaja(item) {
    this.item = item;
    this.detallePiezaMuseable = false
    this.catalogacion = false;
    this.baja=true;

  }
  obtenerDatoHijo(event) {
    this.detallePiezaMuseable = false
    this.catalogacion = false;
    this.baja=false;
    if (event) {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Item Actualizado.' });
    }
  }
  obtenerCategorias(event) {
    this.esfiltroTexto = false;
    this.textoFiltra = null;
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
    if (this.esfiltroTexto)
      this.filtrarItem()
    else
      this.buscar()
    this.bandera = 0;
    this.acciones = this.properties.labelLista + this.title;
  }
  verMovimientos(item) {
    this._itemService.movimientosItem(item.itemid)
      .subscribe((item: any) => {
        this.movimientos = item
        this.verPopUp = true;



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
