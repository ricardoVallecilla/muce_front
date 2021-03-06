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
import { EstilosReportes } from '../../estiloImpresion';
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
  banderaPendientes = 0;
  tiposEgresos = [];
  tiposIngresos = [];
  key = "HackersSeeIT2";
  museo = null;
  tipo = "1"
  tipoSeleccionado = null;
  museoSeleccionado = null;
  categoriaItem = []
  museoItem = [{ label: this.properties.labelSeleccione, value: null }];
  museoFiltroItem = [{ label: this.properties.labelSeleccione, value: null }];
  movimiento: Movimiento = null;
  piezasAgregadas = [];
  itemsSeleccionados = [];
  items = []
  piezasSeleccionados = [];
  categoria = null
  verPopUpItem = false;
  tiposMovimientosGeneral = [];
  movimientos = [];
  movimientosPendientes = 0;
  movimientosPendientesLista = [];
  tipoFormulario = null;
  desabilitados = true;
  movimientosPendientesDevolucion = []
  esAdmin = false;
  totalRecords = null;
  esCustodioCultural = false
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


    let filtrarMuseos = false
    if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
      this.museo = persona.usuario.museoId;
      let roles = persona.usuario.roles
      if (roles) {
        console.log(roles);
        
        if (roles.find(x => x.rolid == this.constantes.rolAdministrador) || roles.find(x => x.rolid == this.constantes.rolDirector)) {
          this.esAdmin = true;

        } else {
          this.esAdmin = false;
        }

        if (roles.find(x => x.rolid == this.constantes.rolCustodio)) {
          this.esCustodioCultural = true
        }
      }
      if (persona.usuario.museoDosId) {
        this.esAdmin = true
        filtrarMuseos = true;
      }
      console.log(filtrarMuseos);


      this.cargarMuseos(filtrarMuseos, persona.usuario);
      if (this.museo && !filtrarMuseos) {
        this.cargarMovimientos();
        this.cargarMovimientosPendientes();

      }
    }






  }

  buscarMuseo(museo = null) {
    if(museo)this.museo = museo

    if (this.museo != null) {
      this.cargarMovimientos();
      this.cargarMovimientosPendientes();
    }

  }
  agregarItem() {
    this.categoria = null;
    this.items = [];
    this.itemsSeleccionados = [];
    this.verPopUpItem = true;

  }
  cargarMovimientosPendientes() {
    this.msgs = [];
    if (this.museo)
    this._movimientosService.obtenerMovimientosPendientes(this.museo.museoid)
      .subscribe((movimientos: any[]) => {
        this.movimientosPendientesLista = movimientos;
        this.movimientosPendientes = this.movimientosPendientesLista.length;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }));

  }
  loadLazy(event) {
    this.cargarMovimientos(event.first, event.rows)
  }
  cargarMovimientos(first = 0, rows = this.properties.cantidadRegistros) {
    if (this.museo)
      this._movimientosService.cantidadMovimientos(this.museo.museoid)
        .subscribe((cantidad: number) => {
          this.totalRecords = cantidad
          this.movimientos = []
          this._movimientosService.obtenerMovimientos(this.museo.museoid, first, rows)
            .subscribe((movimientos: any[]) => {

              let movimientosLocal = []
              movimientos.forEach(x => {

                if (x.museoreceptorid == this.museo.museoid && x.confirmacion == null) {

                } else {
                  /**
                   * devolucionOtro=730
    devolucionDesinfeccion=731
    devolucionRestauracion=732
    devolucionPrestamoInterno=733
    devolucionPrestamoExterno=734
                   */
                  if (x.tipomovimientoid.catalogoid == this.constantes.devolucionOtro
                    || x.tipomovimientoid.catalogoid == this.constantes.devolucionDesinfeccion
                    || x.tipomovimientoid.catalogoid == this.constantes.devolucionPrestamoExterno
                    || x.tipomovimientoid.catalogoid == this.constantes.devolucionRestauracion
                    || x.museoreceptorid == this.museo.museoid
                  ) {
                    x.receptor = true;
                  } else if (x.museoid == this.museo.museoid) {
                    x.receptor = false;
                  }

                  movimientosLocal.push(x);

                }

              });
              //this.movimientos = movimientos;

              this.movimientos = movimientosLocal
            }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }));
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }));





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



  cargarMuseos(filtrar = false, persona = null) {
    this._museoServices.obtenerTodoMuseos()
      .subscribe((museos: any[]) => {

        if (this.museo) this.museo = museos.find(x => x.museoid == this.museo.museoid);
        this.museoItem = [{ label: this.properties.labelSeleccione, value: null }];
        this.museoFiltroItem = [];
        let museoFiltroItem = []
        let museosLocales = []
        if (this.museo) {
          museosLocales = museos.filter(x => x.museoid != this.museo.museoid)
        } else {
          museosLocales = museos;
        }
        if (filtrar) {
          museoFiltroItem = museos.filter(x => (x.museoid == persona.museoId.museoid || x.museoid == persona.museoDosId.museoid))
        }
        museosLocales.forEach(x => {
          this.museoItem.push({ label: x.nombres, value: x });

        });
        museoFiltroItem.forEach(x => {
          this.museoFiltroItem.push({ label: x.nombres, value: x });

        });
        
        if(this.esAdmin){
          this.museoFiltroItem = [{ label: this.properties.labelSeleccione, value: null }];
          museos.forEach(x => {
            this.museoFiltroItem.push({ label: x.nombres, value: x });
  
          });
        }
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





  nuevo() {
    this.msgs = [];
    this.movimiento = new Movimiento(this.museo.museoid);
    this.tipoFormulario = 1;
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

  actualizarVista(event) {



    switch (event) {
      case 1:
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Movimiento Actualizado.' });
        this.cargarMovimientos();
        this.cargarMovimientosPendientes();
        this.bandera = 0
        break;

      case 2:
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo Actualizar el movimiento.' })
        break;
      case 3:
        this.cargarMovimientos();
        this.cargarMovimientosPendientes();
        this.bandera = 0
        break;
      case 4:
        this.cargarMovimientos();
        this.cargarMovimientosPendientes();
        this.banderaPendientes = 0
        break;
      case 5:
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Movimiento Actualizado.' });
        this.cargarMovimientos();
        this.cargarMovimientosPendientes();
        this.banderaPendientes = 0
        break;

      case 6:
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo Actualizar el movimiento.' })
        break;
    }



  }

  ver(movimiento: Movimiento) {
    movimiento.fechamovimiento = movimiento.fechamovimiento ? new Date(movimiento.fechamovimiento) : null;
    movimiento.fechainicioprestamo = movimiento.fechainicioprestamo ? new Date(movimiento.fechainicioprestamo) : null;
    movimiento.fechafinprestamo = movimiento.fechafinprestamo ? new Date(movimiento.fechafinprestamo) : null;
    this.movimiento = movimiento
    this.tipoFormulario = 3;

    this.tipoSeleccionado = movimiento.tipomovimientoid.catalogoid + "";

    this.bandera = 1;
  }




  confirmarMovimmiento(movimiento) {
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
    this.tipoFormulario = 2
    this.banderaPendientes = 1;

  }
  cargarItemsMovimiento() {

    this._movimientosService.obtenerItemsMovimiento(this.movimiento.movimientoid)
      .subscribe((items: any[]) => {
        this.piezasAgregadas = items;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' }),
        () => {
        });
  }

  devolverMovimiento(movimiento) {

  }



}
