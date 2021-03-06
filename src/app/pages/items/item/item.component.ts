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
  baja = false
  restauracion = false
  museo = null;
  es = this.properties.es;
  verPopUp = false;
  movimientos = [];
  totalRecords = null;
  filtrarMuseos = false;
  esfiltroTexto = false;
  textoFiltra = null
  museosItem = [{ label: this.properties.labelSeleccione, value: null }]
  //banderas de roles
  gruposPermitidos = []
  noTieneMuseo = false;
  especifico = false;
  esCustodio = false;
  verTabla=true;

  textoGrupo
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
      let grupoId;
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.properties.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))

      this.museo = persona.usuario.museoId;

      let roles = persona.usuario.roles

      this.filtrarMuseos = false;


      if (roles.find(x => x.rolid == this.constantes.rolAdministrador) || roles.find(x => x.rolid == this.constantes.rolDirector)) {
        this.filtrarMuseos = true;
      }
      if (roles.find(x => x.rolid == this.constantes.rolCoordinador)) {
        this.filtrarMuseos = true;
      }
      if (roles.find(x => x.rolid == this.constantes.rolCustodio)) {
        this.gruposPermitidos.push(this.constantes.grupoCultural)
        this.filtrarMuseos = false
        this.esCustodio = true;
      }
      if (roles.find(x => x.rolid == this.constantes.rolAdministrativo)) {
        this.gruposPermitidos.push(this.constantes.grupoAdminsitrativo)
        this.filtrarMuseos = false
        this.esCustodio = true;

      }
      if (roles.find(x => x.rolid == this.constantes.rolTecnologia)) {
        this.gruposPermitidos.push(this.constantes.grupoTecnologico)
        this.filtrarMuseos = false
        this.esCustodio = true;
      }
      
      if (persona.usuario.museoDosId) {
        this.filtrarMuseos = true;
      }

      if (this.filtrarMuseos) {
        
        
        if (persona.usuario.museoDosId)
          this.buscarTodosMuseo(persona.usuario);
        else
          this.buscarTodosMuseo();
      } else if (this.museo != null) {
        this.buscarMuseo();
      } else {
        this.noTieneMuseo = true
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No tiene asignado ningun museo. Consulte con el administrador de sistema.' })
      }
      this.cargarCatalogos()
    }
    
    


  }

  buscarMuseo() {
    this._museoServices.obtenerMuseosbyId(this.museo.museoid)
      .subscribe((museo: any) => {
        this.museo = museo;


      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar el museo.' }));
  }

  buscarTodosMuseo(persona = null) {
    this._museoServices.obtenerTodoMuseos()
      .subscribe((museos: any[]) => {
        let museosTmp = []
        museos.forEach(x => {
          museosTmp.push({ label: x.nombres.toUpperCase(), value: x })



        })
      
       
        if (persona) {
          museosTmp=museosTmp.filter(x=>(x.value.museoid==persona.museoId.museoid||x.value.museoid==persona.museoDosId.museoid))
        }
        this.museosItem=museosTmp
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Museos.' }));
  }

  buscar() {
    this.esfiltroTexto = false;
    this.textoFiltra = null;
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


      } else
        this.buscarTodos();
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
    }else{
      this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, null, event.first, event.rows)
      .subscribe((items: any[]) => {
        this.items = items;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
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

  buscarTodos() {
    
    this.esfiltroTexto = false;
    this.textoFiltra = null;
    
    this.msgs = []
    this._itemService.cantidad(this.museo.museoid, this.grupo.catalogoid)
      .subscribe((cantidad: number) => {
        this.totalRecords = cantidad
        
        
        if (cantidad > 0) {
          this._itemService.filtrarItem(this.museo.museoid, this.grupo.catalogoid, null, 0, this.properties.cantidadRegistros)
            .subscribe((items: any[]) => {
              this.items = items;
            }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
        } else {
          this.items = [];
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
          

          switch (this.gruposPermitidos.length) {
            case 1:
              this.grupo = this.grupoItem.find(x => x.value != null && x.value.catalogoid == this.gruposPermitidos[0]).value;
              this.grupoItem = this.grupoItem.filter(x => x.value == null || x.value.catalogoid == this.gruposPermitidos[0])
              this.obtenerCategorias(this.grupo)
              break;
            case 2:
            case 3:
              let grupoTmp = [{ label: this.properties.labelSeleccione, value: null }]
              this.gruposPermitidos.forEach(x2 => {
                grupoTmp.push(this.grupoItem.find(x => x.value != null && x.value.catalogoid == x2))
              });
              this.grupoItem = grupoTmp
              break;
          }

        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Catálogos.' }),
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
    this.baja = false;
    this.restauracion = false
  }
  verCatalogacion(item) {
    this.item = item
    this.detallePiezaMuseable = false
    this.catalogacion = true
    this.baja = false
    this.restauracion = false
  }
  verFormBaja(item) {
    this.item = item;
    this.detallePiezaMuseable = false
    this.catalogacion = false;
    this.baja = true;
    this.restauracion = false
  }
  obtenerDatoHijo(event) {
    this.detallePiezaMuseable = false
    this.catalogacion = false;
    this.baja = false;
    this.restauracion = false
    if (event) {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Item Actualizado.' });
    }
  }

  verFormRestauracion(item) {
    this.item = item;
    this.detallePiezaMuseable = false
    this.catalogacion = false;
    this.baja = false;
    this.restauracion = true
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
