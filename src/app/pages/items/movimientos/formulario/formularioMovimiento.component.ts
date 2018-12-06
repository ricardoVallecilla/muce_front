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
import { EstilosReportes } from '../../../estiloImpresion';
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
  @Input() museo = null;
  tipo = "1"
  tipoSeleccionado = null;
  museoSeleccionado = null;
  categoriaItem = [{ label: this.properties.labelSeleccione, value: null }];
  museoItem = [{ label: this.properties.labelSeleccione, value: null }];
  grupoItem = [{ label: this.properties.labelSeleccione, value: null }];
  @Input() movimiento: Movimiento = null;
  @Input() tipoFormulario = null;
  @Output() notificarGuardar = new EventEmitter();
  vistaPreviaExposicion = false
  listaExposicion = [];
  piezasAgregadas = []
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
  diccionarioImpresion = {}
  categoriasCultural = []
  verDetalleDevolucion=false;
  motivoDevolucion=null;
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
    /*if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
      //console.log(persona)
      this.museo = persona.usuario.museoId;
    }*/
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
      case this.constantes.prestamoInterno:
        this.movimiento.pais = "Ecuador"
        this.movimiento.provincia = "Pichinca"
        this.movimiento.ciudad = "Quito"
        this.movimiento.receptorcargo = "Custodio"

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
      case this.constantes.diccionarioMovimientoEstado.exposicion.tipoMovimiento:
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
    if (this.categoria != null)
      this._itemService.cantidadfiltrarItemsMovimientos(this.museo.museoid, this.constantes.grupoCultural, this.categoria.catalogoid)
        .subscribe((cantidad: number) => {
          this.totalRecords = cantidad;
          this._itemService.filtrarItemsMovimientos(this.museo.museoid, this.constantes.grupoCultural, this.categoria.catalogoid, first, rows)
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
                items = items.filter(x => x.estadoid == null)
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

        if (this.museo) this.museo = museos.find(x => x.museoid == this.museo.museoid);
        this.museoItem = [{ label: this.properties.labelSeleccione, value: null }];
        let museosLocales = []
        if (this.museo) {
          museosLocales = museos.filter(x => x.museoid != this.museo.museoid)
        } else {
          museosLocales = museos;
        }
        museosLocales.forEach(x => {
          this.museoItem.push({ label: x.nombres, value: x });

        });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }
  cargarCatalogos() {

    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoMovimientosEgreso,
    this.constantes.tipoMovimientosIngreso, this.constantes.estadosPiezasMovimientos, this.constantes.grupo, this.constantes.grupoCulturalPadre])
      .subscribe((catalogos: any[]) => {
        catalogos.forEach(x => {
          this.diccionarioImpresion[x.catalogoid + ""] = x.nombre
        });
        this.tiposMovimientosGeneral = catalogos;
        this.tiposEgresos = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoMovimientosEgreso);
        this.tiposIngresos = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoMovimientosIngreso);
        this.categoriasCultural = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupoCulturalPadre);                
        catalogos.filter(x => x.catalogoid == this.constantes.grupoCultural).forEach(x => {
          this.grupoItem.push({ label: x.nombre, value: x })

        });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }




  cambiarTipo() {

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
      case this.constantes.devolucionExposicion + "":
        this.cargarMovimientosPendientesIngreso(this.constantes.diccionarioMovimientoEstado.exposicion.tipoMovimiento);
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
    this.grupo = null;
    this.categoria = null;
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
      if (this.tipoSeleccionado == this.constantes.prestamoInterno + "" || this.tipoSeleccionado == this.constantes.traspasointerno + "") {
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
        case this.constantes.diccionarioMovimientoEstado.exposicion.tipoMovimiento:
          nuevoEstadoPiezas = this.tiposMovimientosGeneral.find(x => x.catalogoid == this.constantes.diccionarioMovimientoEstado.exposicion.estadoPieza);
          break;
        case this.constantes.diccionarioMovimientoEstado.traspasoInterno.tipoMovimiento:
          nuevoEstadoPiezas = this.tiposMovimientosGeneral.find(x => x.catalogoid == this.constantes.diccionarioMovimientoEstado.traspasoInterno.estadoPieza);
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

  print() {
    let printSectionId = "print-section"
    let popupWinindow
    let innerContents = document.getElementById(printSectionId).innerHTML;
    let innerContents2 = innerContents.replace('*:"', ':');
    popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    let tituloReporte = "ACTA DE EGRESO DE OBRAS / MOVIMIENTO"
    let estilosReporte = new EstilosReportes()
    //formatoFecha = "dd/MM/yyyy";
    let fechaDate = new Date(this.movimiento.fechamovimiento);
    let fecha = fechaDate.getDay() + "/" + fechaDate.getMonth() + "/" + fechaDate.getFullYear();
    popupWinindow.document.write('<html><head><style>' + estilosReporte.estilo + '</style></head><body onload="window.print();window.close()"> <div >'
      + this.properties.cabezeraReporte(tituloReporte, this.movimiento.movimientoid, fecha, 1)
      + innerContents2
      + '</div></html>');
    popupWinindow.document.close();
  }
  printExposicion() {
    let printSectionId = "exposicionPrint"
    let popupWinindow
    let innerContents = document.getElementById(printSectionId).innerHTML;
    let innerContents2 = innerContents.replace('*:"', ':');
    popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    let tituloReporte = "ITEMS PARA EXPOSICIÓN"
    let estilosReporte = new EstilosReportes()
    //formatoFecha = "dd/MM/yyyy";
    let fechaDate = new Date(this.movimiento.fechamovimiento);
    let fecha = fechaDate.getDay() + "/" + fechaDate.getMonth() + "/" + fechaDate.getFullYear();
    popupWinindow.document.write('<html><head><style>' + estilosReporte.estilo + '</style></head><body onload="window.print();window.close()"> <div >'
      + this.properties.cabezeraReporte(tituloReporte, "", fecha, 0)
      + innerContents2
      + '</div></html>');
    popupWinindow.document.close();
  }


  consultaReporteExposicion() {
    let consultaReporte = [];
    this.categoriasCultural.forEach(categoria => {

      let listaCategoria = this.piezasAgregadas.filter(x => x.categoriaid.catalogoid == categoria.catalogoid);
      if (listaCategoria.length > 0) {
        let tipo
        switch (categoria.catalogoid) {
          case this.constantes.arqueologia:
            tipo = 1
            break;
          case this.constantes.botanica:
            tipo = 2
            break;
          case this.constantes.instrumental:
            tipo = 6;
            break;
          case this.constantes.entomologia:
            tipo = 3;
            break;
          case this.constantes.fotografia:
            tipo = 5
            break;
          case this.constantes.geologia:
            tipo = 7
            break;

          case this.constantes.peleontologia:
            tipo = 8
            break;

          case this.constantes.zoologia:
            tipo = 9
            break;

          default:
            break;
        }
        let consulta = { tipo: tipo, items: [] }
        listaCategoria.forEach(item => {
          consulta.items.push(item.itemid)
        });
        consultaReporte.push(consulta)
      }

    });



    this._itemService.reporteExposicion(consultaReporte)
      .subscribe((items: any[]) => {
        this.listaExposicion = []
        items.forEach(x => {
          let listaRegistros = []
          switch (x.tipo) {

            case 1:
              x.items.forEach(registro => {
                let registroJson = {}
                registroJson["nombre"] = registro[0]
                registroJson["ruta"] = registro[1]
                registroJson["categoria"] = registro[2]
                registroJson["periodo"] = registro[3]
                registroJson["cronologia"] = registro[4]
                registroJson["cultura"] = registro[5]
                registroJson["fase"] = registro[6]
                registroJson["alto"] = registro[7]
                registroJson["largo"] = registro[8]
                registroJson["profundidad"] = registro[9]
                registroJson["diametro"] = registro[10]
                registroJson["espesor"] = registro[11]
                registroJson["peso"] = registro[12]
                if (registro[1] != null) this.descargarFoto(registroJson);
                listaRegistros.push(registroJson)
              });
              break;
            case 3:
              x.items.forEach(registro => {
                let registroJson = {}
                registroJson["nombre"] = registro[0]
                registroJson["ruta"] = registro[1]
                registroJson["cientifico"] = registro[2]
                registroJson["comun"] = registro[3]
                registroJson["autor"] = registro[4]
                registroJson["clase"] = registro[5]
                registroJson["anio"] = registro[6]
                if (registro[1] != null) this.descargarFoto(registroJson);
                listaRegistros.push(registroJson)
              });
              break;
            //fotografia
            case 5:
              x.items.forEach(registro => {
                let registroJson = {}
                registroJson["nombre"] = registro[0]
                registroJson["ruta"] = registro[1]
                registroJson["titulo"] = registro[2]
                registroJson["tematica"] = registro[3]
                registroJson["procedimiento"] = registro[4]
                registroJson["autor"] = registro[5]
                registroJson["siglo"] = registro[6]
                registroJson["alto"] = registro[7]
                registroJson["largo"] = registro[8]
                if (registro[1] != null) this.descargarFoto(registroJson);
                listaRegistros.push(registroJson)
              });
              break;
            //instrumental cientifico
            case 6:
              x.items.forEach(registro => {
                let registroJson = {}
                registroJson["nombre"] = registro[0]
                registroJson["ruta"] = registro[1]
                if (registro[1] != null) this.descargarFoto(registroJson);
                registroJson["inventor"] = registro[2]
                registroJson["fabricante"] = registro[3]
                registroJson["lugar"] = registro[4]
                registroJson["fecha"] = registro[5]
                registroJson["alto"] = registro[6]
                registroJson["largo"] = registro[7]
                registroJson["profundidad"] = registro[8]
                registroJson["diametro"] = registro[9]
                registroJson["espesor"] = registro[10]
                registroJson["peso"] = registro[11]

                listaRegistros.push(registroJson)
              });
              break;
            //geologia
            case 7:
              x.items.forEach(registro => {
                let registroJson = {}
                registroJson["nombre"] = registro[0]
                registroJson["ruta"] = registro[1]
                if (registro[1] != null) this.descargarFoto(registroJson);

                listaRegistros.push(registroJson)
              });
              break;
            //Peleontologia
            case 8:
              x.items.forEach(registro => {
                let registroJson = {}
                registroJson["nombre"] = registro[0]
                registroJson["ruta"] = registro[1]
                if (registro[1] != null) this.descargarFoto(registroJson);
                registroJson["cientifico"] = registro[2]
                registroJson["comun"] = registro[3]
                registroJson["clase"] = registro[4]


                listaRegistros.push(registroJson)
              });
              break;
            //zoologia
            case 9:
              x.items.forEach(registro => {
                let registroJson = {}
                registroJson["nombre"] = registro[0]
                registroJson["ruta"] = registro[1]
                if (registro[1] != null) this.descargarFoto(registroJson);
                registroJson["cientifico"] = registro[2]
                registroJson["comun"] = registro[3]
                registroJson["autor"] = registro[4]


                listaRegistros.push(registroJson)
              });
              break;

            default:
              break;
          }
          this.listaExposicion.push({ "tipo": x.tipo, "registros": listaRegistros })
        });


        this.vistaPreviaExposicion = true;

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }));
  }

  descargarFoto(registroLista) {
    this._itemService.downloadUrlImagen(registroLista.ruta).
      subscribe((foto: any) => {


        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        registroLista.imagen = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

        //let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        //this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
  }
  devolver(){

    this.motivoDevolucion=null;
    this.verDetalleDevolucion=true;

  }

  confirmarDevolucion(){
    let guardar =Object.assign({}, this.movimiento);
    guardar["motivoDevolucion"]=this.motivoDevolucion

    this._movimientosService.confirmarDevolucionMovimiento(guardar)
          .subscribe((museos: any[]) => {
            this.motivoDevolucion=null;
            this.verDetalleDevolucion=false;
            this.notificarGuardar.emit(5)
          }, (err: any) => this.notificarGuardar.emit(6));
  }
}
