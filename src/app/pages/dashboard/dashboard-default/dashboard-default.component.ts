import { Component, OnInit } from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';
import { MovimientosService } from '../../../services/movimientos/movimientos.service';
import { Properties } from '../../properties';
import { Constantes } from '../../constantes';
import * as CryptoJS from 'crypto-js';
import { MuseoServices } from '../../../services/museo/museo.services';
import { GeneralService } from '../../../services/general/general.service';
import { Router } from '@angular/router';

declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: [
    './dashboard-default.component.css'
  ]
})
export class DashboardDefaultComponent implements OnInit {
  properties = new Properties();
  constantes = new Constantes();
  museo;
  key = "HackersSeeIT2";
  museoItem = [{ label: this.properties.labelSeleccione, value: null }];
  movimientos = []
  movimientosPendientesLista = [];
  movimientosPendientes = 0;
  esAdmin = false
  verDasboard = false;
  cantidadPiezas = []
  cantidadPiezasInventario = []
  cantidadPiezasCatalogacion = []
  restauracion=0;
  constructor(
    private _generalService: GeneralService,
    private _router: Router,
    private _movimientosService: MovimientosService,
    private _museoServices: MuseoServices
  ) { }

  ngOnInit() {
    try {
      if (localStorage.getItem("sesion") != null) {
        var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.key);
        let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
        

        this.museo = persona.usuario.museoId;

        if (persona.usuario.rolId.rolid == this.constantes.rolAdministrador || persona.usuario.rolId.rolid == this.constantes.rolDirector) {
          this.esAdmin = true;
          this.verDasboard = true;

        } else if (persona.usuario.rolId.rolid == this.constantes.rolCustodio) {
          this.verDasboard = true;
          this.esAdmin = false;
        }

        this.cargarMuseos();
        if (this.museo) {
          this.cargarMureporteGeneral()
          this.cargarMovimientosPendientes();
          this.cargarMovimientosPendientesConfirmacion()

        }
      }

    } catch (error) {
      
      this._generalService.stopBlock();
      this._router.navigate(['/authentication/login']);
    }
  }
  cargarMovimientosPendientes() {

    this._movimientosService.pendientesgeneral(this.museo.museoid, [this.constantes.prestamoExterno, this.constantes.prestamoInterno
      , this.constantes.diccionarioMovimientoEstado.desinfecion.tipoMovimiento
      , this.constantes.diccionarioMovimientoEstado.otro.tipoMovimiento
      , this.constantes.diccionarioMovimientoEstado.restauracion.tipoMovimiento
      , this.constantes.diccionarioMovimientoEstado.exposicion.tipoMovimiento
    ])
      .subscribe((movimientos: any[]) => {
        movimientos.forEach(x => {
          if (x.fechafinprestamo) {
            let fechafinprestamo = new Date(x.fechafinprestamo).getTime();
            let hoyDate = new Date();
            hoyDate.setHours(0, 0, 0, 0);
            let hoy = hoyDate.getTime();
            let diff = hoy - fechafinprestamo;

            let dias = (diff / (1000 * 60 * 60 * 24));
            
            x.dias = dias
          }
          if (x.tipomovimientoid.catalogoid == this.constantes.devolucionOtro
            || x.tipomovimientoid.catalogoid == this.constantes.devolucionDesinfeccion
            || x.tipomovimientoid.catalogoid == this.constantes.devolucionRestauracion
            || x.museoreceptorid == this.museo.museoid
          ) {
            x.receptor = true;
          } else if (x.museoid == this.museo.museoid) {
            x.receptor = false;
          }
        });

        this.movimientos = movimientos;


      }, (err: any) => null);

  }
  buscar() {
    if (this.museo != null) {
      this.cargarMureporteGeneral()
      this.cargarMovimientosPendientes();
      this.cargarMovimientosPendientesConfirmacion()
    }
  }
  cargarMovimientosPendientesConfirmacion() {

    this._movimientosService.obtenerMovimientosPendientes(this.museo.museoid)
      .subscribe((movimientos: any[]) => {
        this.movimientosPendientesLista = movimientos;
        this.movimientosPendientes = this.movimientosPendientesLista.length;
      }, (err: any) => null);

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
      }, (err: any) => null,
        () => {
        });
  }

  cargarMureporteGeneral() {
    this._museoServices.reporteGeneral(this.museo.museoid, this.constantes.grupoCultural)
      .subscribe((reporte: any) => {
        let cantidadPiezas = []
        let total = 0
        reporte.cantidadPiezas.forEach(x => {
          cantidadPiezas.push({ "categoria": x[0], "cantidad": x[1] })
          total += x[1]
        });
        
        cantidadPiezas.push({ "categoria": "TOTAL", "cantidad": total })
        this.cantidadPiezas=cantidadPiezas

        
        let cantidadPiezasInventario = []
        let totalInventario = 0
        reporte.cantidadPiezasInventario.forEach(x => {
          cantidadPiezasInventario.push({ "categoria": x[0], "cantidad": x[1] })
          totalInventario += x[1]
        });
        cantidadPiezasInventario.push({ "categoria": "TOTAL", "cantidad": totalInventario })
        this.cantidadPiezasInventario=cantidadPiezasInventario

        let cantidadPiezasCatalogacion = []
        let totalCatalogacion = 0
        reporte.cantidadPiezasCatalogacion.forEach(x => {
          cantidadPiezasCatalogacion.push({ "categoria": x[0], "cantidad": x[1] })
          totalCatalogacion += x[1]
        });
        cantidadPiezasCatalogacion.push({ "categoria": "TOTAL", "cantidad": totalCatalogacion })
        this.cantidadPiezasCatalogacion=cantidadPiezasCatalogacion;
        this.restauracion=reporte.cantidadPiezasRestauracion

      }, (err: any) => null);
  }


}


