import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { MuseoServices } from '../../../../services/museo/museo.services';
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../../services/item/items.service'
import { MovimientosService } from '../../../../services/movimientos/movimientos.service'
import { Message, ConfirmationService } from 'primeng/primeng';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Movimiento } from '../../../../models/movimiento.model';
import * as CryptoJS from 'crypto-js';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'formularioMovimiento',
  templateUrl: './formularioMovimiento.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class FormularioMovimientoComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Movimientos Piezas Patrimoniales"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  es = this.properties.es;
  bandera = 0;
  banderaPendientes = 0;
  tiposEgresos = [];
  tiposIngresos = [];
  key = "HackersSeeIT2";
  museo = null;
  tipo = "1"
  tipoSeleccionado = null;
  museoSeleccionado = null;
  categoriaItem = [{ label: this.properties.labelSeleccione, value: null }];
  museoItem = [{ label: this.properties.labelSeleccione, value: null }];
  grupoItem = [{ label: this.properties.labelSeleccione, value: null }];
  @Input() movimiento: Movimiento = null;
  @Input() tipoFormulario = null;
  @Output() notificarGuardar = new EventEmitter();
  piezasAgregadas = [];
  itemsSeleccionados = [];
  items = []
  piezasSeleccionados = [];
  categoria = null
  verPopUpPendientes = false;
  verPopUpItem = false;
  tiposMovimientosGeneral = [];
  movimientos = [];
  movimientosPendientes = 0;
  movimientosPendientesLista = [];
  movimientosPendientesDevolucion = [];
  desabilitados = true;
  verPopUpDetallePendiente = false;
  esDevolucion = false
  totalRecords = null;
  grupo;
  esfiltroTexto;
  textoFiltra;
  constructor(
    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer,
    private _museoServices: MuseoServices,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService,
    private _movimientosService: MovimientosService

  ) {


  }

  ngOnInit() {
    if (this.tipoFormulario == 1) {
      this.desabilitados = false;
    }
    this.cargarCatalogos();
    if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
      //console.log(persona)
      this.museo = persona.usuario.museoId;
    }
    this.cargarMuseos();
  }

  ngOnChanges(cambios: SimpleChanges) {
    if (cambios.movimiento) {
      if (this.movimiento.movimientoid != null) this.ver(this.movimiento)
    }
  }


  agregarItem() {
    this.categoria = null;
    this.items = [];
    this.itemsSeleccionados = [];
    this.verPopUpItem = true;

  }
  cargarMovimientosPendientes() {
    this._movimientosService.obtenerMovimientosPendientes(this.museo.museoid)
      .subscribe((movimientos: any[]) => {
        this.movimientosPendientesLista = movimientos;
        this.movimientosPendientes = this.movimientosPendientesLista.length;
        this.verPopUpPendientes = true;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }),
        () => {
        });

  }
  verMovimientoDevolucion(movimiento) {
    this.movimiento = movimiento
    this.verPopUpDetallePendiente = true;

  }


  seleccionarMovimientoDevolucion(movimiento) {
    this.esDevolucion = true

    switch (movimiento.tipomovimientoid.catalogoid) {
      case this.constantes.devolucionPrestamoInterno:
        this.movimiento.pais = "Ecuador"
        this.movimiento.provincia = "Pichinca"
        this.movimiento.ciudad = "Quito"
        this.movimiento.receptorcargo = "Custodio"
        console.log(movimiento)
        this.museoSeleccionado = this.museoItem.find(x => (x.value != null && x.value.museoid == movimiento.museoid)).value
        this.cambiarMuseo();

        this.cargarItemsMovimiento(movimiento.movimientoid)
        this.movimiento.museoreceptorid = movimiento.museoid
        this.movimiento.movimientorelacionadoid = movimiento.movimientoid
        this.verPopUpPendientes = false;
        break;
      case this.constantes.diccionarioMovimientoEstado.desinfecion.tipoMovimiento:
      case this.constantes.diccionarioMovimientoEstado.otro.tipoMovimiento:
      case this.constantes.diccionarioMovimientoEstado.restauracion.tipoMovimiento:
      case this.constantes.prestamoExterno:
        this.movimiento.institucion = movimiento.institucion
        this.movimiento.direccion = movimiento.direccion
        this.movimiento.telefono = movimiento.telefono
        this.movimiento.email = movimiento.email
        this.movimiento.pais = movimiento.pais
        this.movimiento.provincia = movimiento.provincia
        this.movimiento.ciudad = movimiento.ciudad
        this.movimiento.receptorcargo = "Custodio"
        this.cargarItemsMovimiento(movimiento.movimientoid)

        this.movimiento.movimientorelacionadoid = movimiento.movimientoid
        this.verPopUpPendientes = false;
        break;
      default:
        break;
    }




  }

  cambiarMuseo() {
    this.movimiento.institucion = this.museoSeleccionado.nombres
    this.movimiento.direccion = this.museoSeleccionado.ubicacion
    this.movimiento.telefono = this.museoSeleccionado.telefono
    //this.movimiento.entreganombre = this.museoSeleccionado.cutodioId.nombres
    //this.movimiento.entregareserva = this.museoSeleccionado.nombres


    this.movimiento.receptornombre = this.museoSeleccionado.cutodioId.nombres
    this.movimiento.receptorcargo = "Custodio"
    this.movimiento.receptorreserva = this.museoSeleccionado.nombres
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


  buscar(first = 0, rows = this.properties.cantidadRegistros) {

    this._itemService.cantidadfiltrarItemsMovimientos(this.museo.museoid, this.constantes.tipoIngresoPrestamo, this.categoria.catalogoid)
      .subscribe((cantidad: number) => {
        this.totalRecords = cantidad;
        this._itemService.filtrarItemsMovimientos(this.museo.museoid, this.constantes.tipoIngresoPrestamo, this.categoria.catalogoid, first, rows)
          .subscribe((items: any[]) => {
            this.items = items;
          }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));

  }



  filtrarItem(first = 0, rows = this.properties.cantidadRegistros) {
    this.grupo = null
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

  loadItemLazy(event) {
    if (this.esfiltroTexto)
      this.filtrarItem(event.first, event.rows)
    else
      this.buscar(event.first, event.rows)
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

    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoMovimientosEgreso,
    this.constantes.tipoMovimientosIngreso, this.constantes.estadosPiezasMovimientos, this.constantes.grupo])
      .subscribe((catalogos: any[]) => {
        this.tiposMovimientosGeneral = catalogos;
        this.tiposEgresos = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoMovimientosEgreso);
        this.tiposIngresos = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoMovimientosIngreso);
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupo).forEach(x => {
          this.grupoItem.push({ label: x.nombre, value: x })
        });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }




  cambiarTipo() {
    console.log(this.tipoSeleccionado)
    switch (this.tipoSeleccionado) {
      case this.constantes.prestamoInterno + "":
      case this.constantes.traspasointerno + "":
        this.movimiento = new Movimiento(this.museo.museoid);

        this.movimiento.pais = "Ecuador"
        this.movimiento.provincia = "Pichinca"
        this.movimiento.ciudad = "Quito"

        this.movimiento.entregacargo = "Custodio"



        break;
      case this.constantes.devolucionDesinfeccion + "":
        this.cargarMovimientosPendientesIngreso(this.constantes.diccionarioMovimientoEstado.desinfecion.tipoMovimiento);
        break;
      case this.constantes.devolucionRestauracion + "":
        this.cargarMovimientosPendientesIngreso(this.constantes.diccionarioMovimientoEstado.restauracion.tipoMovimiento);
        break;
      case this.constantes.devolucionPrestamoExterno + "":
        this.cargarMovimientosPendientesIngreso(this.constantes.prestamoExterno);
        break;
      case this.constantes.devolucionPrestamoInterno + "":
        this.cargarMovimientoPrestamosInterno(this.constantes.prestamoInterno);
        break;
      case this.constantes.devolucionOtro + "":
        this.cargarMovimientosPendientesIngreso(this.constantes.diccionarioMovimientoEstado.otro.tipoMovimiento);
        break;
      default:
        break;
    }



    this.movimiento.entreganombre = this.museo.cutodioId.nombres
    this.movimiento.entregacargo = "Custodio"
    this.movimiento.entregareserva = this.museo.nombres
  }

  cargarMovimientosPendientesIngreso(tipo) {

    this._movimientosService.cargarMovimientoPendientesIngreso(this.museo.museoid, tipo)
      .subscribe((items: any[]) => {
        this.movimientosPendientesDevolucion = [];
        this.movimientosPendientesDevolucion = items;
        this.verPopUpPendientes = true;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }));
  }

  cargarMovimientoPrestamosInterno(tipo) {

    this._movimientosService.cargarMovimientoPrestamosInternos(this.museo.museoid, tipo)
      .subscribe((items: any[]) => {
        this.movimientosPendientesDevolucion = [];
        this.movimientosPendientesDevolucion = items;
        this.verPopUpPendientes = true;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }),
        () => {
        });
  }
  nuevo() {
    this.msgs = [];
    this.movimiento = new Movimiento(this.museo.museoid);
    this.bandera = 1;
    this.esDevolucion = false
  }

  volver() {
    switch (this.tipoFormulario) {
      case 1:
      case 3:
        this.notificarGuardar.emit(3)
        break;
      case 2:
        this.notificarGuardar.emit(4)
        break;

      default:
        break;
    }


  }

  cancerlarAgregar() {
    this.verPopUpItem = false;
  }

  agregarItems() {
    this.grupo=null;
    this.categoria=null;
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

  confirmar() {

    if (this.piezasAgregadas.length > 0) {
      this.confirmationService.confirm({
        key: "confirmarNotificacion",
        message: "El siguiente movimiento modificará el estado de las piezas y no se podra modificar una vez creado.",
        header: "Advertencia",
        icon: this.properties.iconAdvertencia,
      });
    } else {
      this.confirmationService.confirm({
        key: "validacionItems",
        message: "No se puede crear un movimientos sin piezas.",
        header: "Advertencia",
        icon: this.properties.iconAdvertencia,
      });
    }


  }

  guardar() {
    if (this.tipoFormulario == 1) {
      this.movimiento.tipomovimientoid = this.tiposMovimientosGeneral.find(x => x.catalogoid + "" == this.tipoSeleccionado);
      if (this.tipoSeleccionado == this.constantes.prestamoInterno + "") {
        this.movimiento.museoreceptorid = this.museoSeleccionado.museoid;
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

        case this.constantes.diccionarioMovimientoEstado.otro.tipoMovimiento:
          nuevoEstadoPiezas = this.tiposMovimientosGeneral.find(x => x.catalogoid == this.constantes.diccionarioMovimientoEstado.otro.estadoPieza);
          break;

        default:
          break;
      }
      let objGuardar = { movimiento: this.movimiento, piezas: piezas, nuevoestadositem: nuevoEstadoPiezas }

      if (!this.esDevolucion)
        this._movimientosService.guardarMovimiento(objGuardar)
          .subscribe((museos: any[]) => {
            this.notificarGuardar.emit(1)
          }, (err: any) => this.notificarGuardar.emit(2));
      else
        this._movimientosService.guardarMovimientoDevolucion(objGuardar)
          .subscribe((museos: any[]) => {
            this.notificarGuardar.emit(1)
          }, (err: any) => this.notificarGuardar.emit(2));
    } else {


      if (this.movimiento.tipomovimientoid.catalogoid == this.constantes.devolucionPrestamoInterno || this.movimiento.tipomovimientoid.catalogoid == this.constantes.devolucionPrestamoExterno) {
        this._movimientosService.confirmarMovimientoPiezas(this.movimiento.movimientoid)
          .subscribe((museos: any[]) => {
            this.notificarGuardar.emit(5)
          }, (err: any) => this.notificarGuardar.emit(6));
      } else {
        this._movimientosService.confirmarMovimiento(this.movimiento.movimientoid)
          .subscribe((museos: any[]) => {
            this.notificarGuardar.emit(5)
          }, (err: any) => this.notificarGuardar.emit(6));
      }


    }



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

    this.tipoSeleccionado = movimiento.tipomovimientoid.catalogoid + "";

    this.bandera = 1;
  }
  cargarItemsMovimiento(movimientoid = null) {
    let movimientoidLocal;
    if (movimientoid == null)
      movimientoidLocal = this.movimiento.movimientoid
    else
      movimientoidLocal = movimientoid
    this._movimientosService.obtenerItemsMovimiento(movimientoidLocal)
      .subscribe((items: any[]) => {
        this.piezasAgregadas = items;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }));
  }
}
