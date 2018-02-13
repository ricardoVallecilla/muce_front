import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { MuseoServices } from '../../../services/museo/museo.services';
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../services/item/items.service'
import { MovimientosService } from '../../../services/movimientos/movimientos.service'
import { Message, ConfirmationService } from 'primeng/primeng';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Movimiento } from '../../../models/movimiento.model';
import * as CryptoJS from 'crypto-js';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'movimientos',
  templateUrl: './movimientos.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class MovimientosComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Movimientos Piezas Patrimoniales"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  es = this.properties.es;
  bandera = 0;
  tiposEgresos = [];
  tiposIngresos = [];
  key = "HackersSeeIT2";
  museo = null;
  tipo = "1"
  tipoSeleccionado = null;
  museoSeleccionado = null;
  categoriaItem = []
  museoItem = [{ label: this.properties.labelSeleccione, value: null }];
  movimiento: Movimiento = null;
  piezasAgregadas = [];
  itemsSeleccionados = [];
  items = []
  piezasSeleccionados = [];
  categoria = null
  verPopUpItem = false;
  tiposMovimientosGeneral = [];
  movimientos = [];
  constructor(
    private domSanitizer: DomSanitizer,
    private _museoServices: MuseoServices,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService,
    private _movimientosService: MovimientosService

  ) {


  }

  ngOnInit() {

    this.cargarCatalogos();
    this.obtenerCategorias();



    if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
      //console.log(persona)
      this.museo = persona.usuario.museoId;
    }
    this.cargarMuseos();
    this.cargarMovimientos();

  }

  agregarItem() {
    this.categoria = null;
    this.items = [];
    this.itemsSeleccionados = [];
    this.verPopUpItem = true;

  }
  cargarMovimientos() {
    this._movimientosService.obtenerMovimientos(this.museo.museoid)
      .subscribe((movimientos: any[]) => {
        this.movimientos = movimientos;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }),
      () => {
      });

  }
  cambiarMuseo() {
    this.movimiento.receptornombre = this.museoSeleccionado.cutodioId.nombres
    this.movimiento.receptorcargo = "Custodio"
    this.movimiento.receptorreserva = this.museoSeleccionado.nombres
  }
  obtenerCategorias() {

    let filtro = this.constantes.grupoCulturalPadre;


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
    this._itemService.filtrarItemsMovimientos(this.museo.museoid, this.constantes.tipoIngresoPrestamo, this.categoria.catalogoid)
      .subscribe((items: any[]) => {
        this.items = items;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }

  cargarMuseos() {
    this._museoServices.obtenerTodoMuseos()
      .subscribe((museos: any[]) => {
        console.log(museos)
        this.museo = museos.find(x => x.museoid == this.museo.museoid);
        this.museoItem = [{ label: this.properties.labelSeleccione, value: null }];
        museos.filter(x => x.museoid != this.museo.museoid).forEach(x => {
          this.museoItem.push({ label: x.nombres, value: x });

        });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
  cargarCatalogos() {

    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoMovimientosEgreso, this.constantes.tipoMovimientosIngreso, this.constantes.estadosPiezasMovimientos])
      .subscribe((catalogos: any[]) => {
        this.tiposMovimientosGeneral = catalogos;
        this.tiposEgresos = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoMovimientosEgreso);
        this.tiposIngresos = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoMovimientosIngreso);
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }

  cambiarTipo() {
    console.log(this.tipoSeleccionado)
    switch (this.tipoSeleccionado) {
      case this.constantes.prestamoInterno + "":
      case this.constantes.traspasoiterno + "":
        this.movimiento = new Movimiento(this.museo.museoid);
        this.movimiento.institucion = this.museo.nombres
        this.movimiento.direccion = this.museo.ubicacion
        this.movimiento.pais = "Ecuador"
        this.movimiento.provincia = "Pichinca"
        this.movimiento.ciudad = "Quito"
        this.movimiento.telefono = this.museo.telefono
        this.movimiento.entreganombre = this.museo.cutodioId.nombres
        this.movimiento.entregacargo = "Custodio"
        this.movimiento.entregareserva = this.museo.nombres

        break;

      default:
        break;
    }
    this.movimiento.entreganombre = this.museo.cutodioId.nombres
    this.movimiento.entregacargo = "Custodio"
    this.movimiento.entregareserva = this.museo.nombres
  }
  nuevo() {
    this.msgs = [];
    this.movimiento = new Movimiento(this.museo.museoid);
    this.bandera = 1;
  }

  volver() {
    this.msgs = [];
    this.bandera = 0;
  }

  cancerlarAgregar() {
    this.verPopUpItem = false;
  }

  agregarItems() {
    console.log(this.itemsSeleccionados)
    let piezas = [...this.piezasAgregadas];
    this.itemsSeleccionados.forEach(x => {
      let encontrado = this.piezasAgregadas.find(x2 => x2.itemid == x.itemid)
      if (encontrado == undefined) {
        piezas.push(x)
      }

    });
    this.piezasAgregadas = piezas;
    this.verPopUpItem = false;
  }

  quitarTodos() {
    this.piezasSeleccionados = [];
    this.piezasAgregadas = [];
  }
  quitarSeleccionados() {
    let piezas = [...this.piezasAgregadas];
    this.piezasSeleccionados.forEach(x => {
      let index = this.piezasAgregadas.indexOf(x);
      piezas = piezas.filter((val, i) => i != index);

    });

    this.piezasAgregadas = piezas;


  }

  guardar() {

    this.movimiento.tipomovimientoid = this.tiposMovimientosGeneral.find(x => x.catalogoid + "" == this.tipoSeleccionado);
    if (this.tipoSeleccionado==this.constantes.prestamoInterno+""){
      this.movimiento.museoreceptorid=this.museoSeleccionado.museoid;
    }
    let piezas = [];
    this.piezasAgregadas.forEach(element => {
      piezas.push({ movimientopiezaPK: { movimientoid: null, itemid: element.itemid } })
    });

    let nuevoEstadoPiezas = null;
    switch (Number(this.tipoSeleccionado)) {
      case this.constantes.diccionarioMovimientoEstado.desinfecion.tipoMovimiento:
        nuevoEstadoPiezas = this.tiposMovimientosGeneral.find(x => x.catalogoid == this.constantes.diccionarioMovimientoEstado.desinfecion.estadoPieza);
        break;
      case this.constantes.diccionarioMovimientoEstado.restauracion.tipoMovimiento:
        nuevoEstadoPiezas = this.tiposMovimientosGeneral.find(x => x.catalogoid == this.constantes.diccionarioMovimientoEstado.restauracion.estadoPieza);
        break;
      case this.constantes.diccionarioMovimientoEstado.prestamoInterno.tipoMovimiento:
        nuevoEstadoPiezas = this.tiposMovimientosGeneral.find(x => x.catalogoid == this.constantes.diccionarioMovimientoEstado.prestamoInterno.estadoPieza);
        break;
      case this.constantes.diccionarioMovimientoEstado.prestamoExterno.tipoMovimiento:
        nuevoEstadoPiezas = this.tiposMovimientosGeneral.find(x => x.catalogoid == this.constantes.diccionarioMovimientoEstado.prestamoExterno.estadoPieza);
        break;

      default:
        break;
    }




    let objGuardar = { movimiento: this.movimiento, piezas: piezas, nuevoestadositem: nuevoEstadoPiezas }
    this._movimientosService.guardarMovimiento(objGuardar)
      .subscribe((museos: any[]) => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Movimiento Actualizado.' });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo Actualizar el movimiento.' }),
      () => {
      });

  }
  ver(movimiento: Movimiento) {
    movimiento.fechamovimiento = movimiento.fechamovimiento ? new Date(movimiento.fechamovimiento) : null;
    movimiento.fechainicioprestamo = movimiento.fechainicioprestamo ? new Date(movimiento.fechainicioprestamo) : null;
    movimiento.fechafinprestamo = movimiento.fechafinprestamo ? new Date(movimiento.fechafinprestamo) : null;
    this.movimiento = movimiento
    this.cargarItemsMovimiento();
    if (movimiento.tipomovimientoid.catalogoid > this.constantes.tipoMovimientosEgreso && movimiento.tipomovimientoid.catalogoid < this.constantes.tipoMovimientosIngreso)
      this.tipo = "1"
    else
      this.tipo = "2"

    this.tipoSeleccionado=movimiento.tipomovimientoid.catalogoid+"";
    
    this.bandera = 1;
  }
  cargarItemsMovimiento() {

    this._movimientosService.obtenerItemsMovimiento(this.movimiento.movimientoid)
      .subscribe((items: any[]) => {
        this.piezasAgregadas = items;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }),
      () => {
      });
  }
}
