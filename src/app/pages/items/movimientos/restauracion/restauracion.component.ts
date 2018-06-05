import { Component, Input, EventEmitter, Output } from '@angular/core'
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks"
import { Item } from "../../../../models/item.model"
import { CatalogoService } from "../../../../services/catalogos/catalogos.service"
import { Properties } from "../../../properties"
import { Constantes } from "../../../constantes"
import { Message, ConfirmationService } from 'primeng/primeng'
import { ItemService } from "../../../../services/item/items.service";
import { PiezaMuseable } from "../../../../models/piezaMuseable.model";
import { EstadoBien } from "../../../../models/estadogeneral.model";
import { DomSanitizer } from "@angular/platform-browser";
import { DetalleCatalogo } from "../../../../models/detallecatalogo.model";

@Component({
    selector: 'restauracion',
    templateUrl: './restauracion.html'
  })
  export class RestauracionComponent implements OnInit {

    @Input() item: Item = null
    @Input() detalle = null
    @Input() piezaMuseable: PiezaMuseable = null
    @Output() enviadorCondicion = new EventEmitter()

    properties = new Properties()
    constantes = new Constantes()
    esCatalogacion: any
    es = this.properties.es
    msgs: Message[] = [];
    acciones = ""
    foto = null;
    estadoConservacion = null;
    integridadPieza = null;

    tipoItem = [{ label: this.properties.labelSeleccione, value: null }]
    grupoItem = [{ label: this.properties.labelSeleccione, value: null }]
    provinciaItem = [{ label: this.properties.labelSeleccione, value: null }]
    cantonItem = [{ label: this.properties.labelSeleccione, value: null }]

    estadoConservacionItem = []
    integridadPiezaItem = []
    estadoDelBien = []
    estadosBienSelecionados = []
    materialesSelecionados = []
    materialesArqueologiaSelecionados = []
    tecnicasConservacionZooSelecionados = []
    tecnicaConservacionBotanicaSelecionados = []
    origenesBotanicaSeleccionados = []
    tecnicaConservacionSelecionados = []

    diccionarioImpresion = {}

    constructor(
      private domSanitizer: DomSanitizer,
      private _catalogoService: CatalogoService,
      private _itemService: ItemService
    ) {}

    ngOnInit() {
      this.buscar(this.item.itemid)
      this.cargarCatalogos()
      this.cargarEstadoBien()
      this.acciones = "Detalle de la pieza: " + this.item.nombre
    }

    cargarCatalogos() {
      this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoIngreso, this.constantes.grupo,
      this.constantes.estadoConservacion, this.constantes.integridadPieza, this.constantes.ubicaciones])
        .subscribe((catalogos: any[]) => {
          catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoIngreso).forEach(x => {
            this.tipoItem.push({ label: x.nombre, value: x })
          })
          catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupo).forEach(x => {
            this.grupoItem.push({ label: x.nombre, value: x })
          })
          this.estadoConservacionItem = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.estadoConservacion)
          this.estadoConservacionItem.forEach(x => {
            this.diccionarioImpresion[x.catalogoid + ""] = x.nombre
          })
          this.integridadPiezaItem = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.integridadPieza)
          this.integridadPiezaItem.forEach(x => {
            this.diccionarioImpresion[x.catalogoid + ""] = x.nombre
          })
          catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.ubicaciones).forEach(x => {
            this.provinciaItem.push({ label: x.nombre, value: x })
          })
  
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
          () => {
          })
    }

    volver() {
      this.enviadorCondicion.emit(false);
    }

    cargarEstadoBien() {
      let padreId;
      switch (this.item.categoriaid.catalogoid) {
        case this.constantes.arqueologia:
          padreId = this.constantes.arqueologiaEstadoBien
          break;
        case this.constantes.botanica:
          padreId = this.constantes.botanicaEstadoBien
          break;
        case this.constantes.entomologia:
          padreId = this.constantes.entomologiaEstadoBien
          break;
        case this.constantes.fotografia:
          padreId = this.constantes.fotografiaEstadoBien
          break;
        case this.constantes.geologia:
          padreId = this.constantes.geologiaEstadoBien
          break;
        case this.constantes.instrumental:
          padreId = this.constantes.isntrumentalEstadoBien
          break;
        case this.constantes.peleontologia:
          padreId = this.constantes.paleontologiaEstadoBien
          break;
        case this.constantes.zoologia:
          padreId = this.constantes.zoologiaEstadoBien
          break;
        default:
          break;
      }
      this._catalogoService.obtenerCatalogosHijosPorPadres([padreId])
        .subscribe((catalogos: any[]) => {
          catalogos.forEach(x => {
            this.diccionarioImpresion[x.catalogoid + ""] = x.nombre
          });
          this.estadoDelBien = catalogos
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de catalogos.' }))
    }

    buscar(itemid) {
      this.msgs = []
      this._itemService.piezaMuseableByItem(itemid)
        .subscribe((piezas: any[]) => {
          this.piezaMuseable = piezas[0]
            if (this.piezaMuseable.fechainventario != null) this.piezaMuseable.fechainventario = new Date(this.piezaMuseable.fechainventario)
            if (this.piezaMuseable.fecharevision != null) this.piezaMuseable.fecharevision = new Date(this.piezaMuseable.fecharevision)
            if (this.piezaMuseable.fechaaprobacion != null) this.piezaMuseable.fechaaprobacion = new Date(this.piezaMuseable.fechaaprobacion)
            this.descargarFoto()
            this.estadoConservacion = this.piezaMuseable.estadoconservacionid.catalogoid
            this.integridadPieza = this.piezaMuseable.estadointegridad.catalogoid
            this.buscarEstadosBien(this.piezaMuseable.piezamuseableid)
            this.buscarCatalogosDetalle(this.piezaMuseable.piezamuseableid)
            this.buscarDetalle(this.piezaMuseable.piezamuseableid)
            this.obtenerCanton(this.piezaMuseable.provinciaid)
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }))
    }

    descargarFoto() {
      this._itemService.downloadFotografia(this.piezaMuseable.piezamuseableid).
        subscribe((foto: any) => {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' })
          this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
        }, (err: any) => {
        }, () => { });
    }

    buscarEstadosBien(piezaMuseableId) {
      this._itemService.estadosBien(piezaMuseableId)
        .subscribe((estados: EstadoBien[]) => {
          this.estadosBienSelecionados = []
          estados.forEach(x => {
            this.estadosBienSelecionados.push(x.piezaCatalogoPk.catalogoid + "")
          })  
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
          () => {
        })
    }

    buscarCatalogosDetalle(piezaMuseableId) {
      let nombresColumna = []
      switch (this.item.categoriaid.catalogoid) {
        case this.constantes.instrumental:
          nombresColumna = ['tipoMaterialInstrumental']
          break
        case this.constantes.arqueologia:
          nombresColumna = ['tipoMaterialArqueologia']
          break
        case this.constantes.botanica:
          nombresColumna = ['tecnicaConservacionBotanica', 'origenBotanica']
          break
        case this.constantes.entomologia:
          nombresColumna = ['tecnicaConservacionEntomologia']
          break
        case this.constantes.fotografia:
          nombresColumna = ['']
          break
        case this.constantes.geologia:
          nombresColumna = ['']
          break
        case this.constantes.peleontologia:
          nombresColumna = ['']
          break
        case this.constantes.zoologia:
          nombresColumna = ['tecnicaConservacionEntomologia']
          break
        default:
          break
      }
      if (nombresColumna.length > 0)
        this._itemService.catalogosDetalle(piezaMuseableId, nombresColumna)
          .subscribe((catalogos: DetalleCatalogo[]) => {
            switch (this.item.categoriaid.catalogoid) {
              case this.constantes.instrumental:
                this.materialesSelecionados = []
                catalogos.forEach(x => {
                  this.materialesSelecionados.push(x.piezacatalogoPk.catalogoid + "")
                })
                break
              case this.constantes.arqueologia:
                this.materialesArqueologiaSelecionados = []
                catalogos.forEach(x => {
                  this.materialesArqueologiaSelecionados.push(x.piezacatalogoPk.catalogoid + "")
                })
                break
              case this.constantes.botanica:
                this.origenesBotanicaSeleccionados = []
                catalogos.filter(x => x.indetificadorcampo == "origenBotanica").forEach(x => {
                  this.origenesBotanicaSeleccionados.push(x.piezacatalogoPk.catalogoid + "")
                })
                this.tecnicaConservacionBotanicaSelecionados = []
                catalogos.filter(x => x.indetificadorcampo == "tecnicaConservacionBotanica").forEach(x => {
                  this.tecnicaConservacionBotanicaSelecionados.push(x.piezacatalogoPk.catalogoid + "")
                })
                break
              case this.constantes.entomologia:
                this.tecnicaConservacionSelecionados = []
                catalogos.forEach(x => {
                  this.tecnicaConservacionSelecionados.push(x.piezacatalogoPk.catalogoid + "")
                })
                break
              case this.constantes.fotografia:
                catalogos.forEach(x => {
                })
                break
              case this.constantes.geologia:
                catalogos.forEach(x => {
                })
                break
              case this.constantes.peleontologia:
                catalogos.forEach(x => {
                })
                break
              case this.constantes.zoologia:
              this.tecnicasConservacionZooSelecionados = []
              catalogos.forEach(x => {
                this.tecnicasConservacionZooSelecionados.push(x.piezacatalogoPk.catalogoid + "")
  
              })
                break
              default:
                break
            }
          }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
            () => {
            })
    }

    buscarDetalle(piezaMuseableId) {
      let tipo;
      switch (this.item.categoriaid.catalogoid) {
        case this.constantes.arqueologia:
          tipo = 1
          break
        case this.constantes.botanica:
          tipo = 2
          break
        case this.constantes.instrumental:
          tipo = 6
          break
        case this.constantes.entomologia:
          tipo = 3
          break
        case this.constantes.fotografia:
          tipo = 5
          break
        case this.constantes.geologia:
          tipo = 7
          break
        case this.constantes.peleontologia:
          tipo = 8
          break
        case this.constantes.zoologia:
          tipo = 9
          break
        default:
          break
      }
      this._itemService.optenerDetalle(tipo, piezaMuseableId)
          .subscribe((detalle: any[]) => {
            if (detalle[0].fechafabricacion != undefined && detalle[0].fechafabricacion != null) detalle[0].fechafabricacion = new Date(detalle[0].fechafabricacion)
            this.detalle = detalle[0]
            this.detalle.piezamuseableid = this.piezaMuseable
          }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' })); 
    }

    obtenerCanton(event) {
      this._catalogoService.obtenerCatalogosHijosPorPadres([event.catalogoid])
        .subscribe((catalogos: any[]) => {
          this.cantonItem = [{ label: this.properties.labelSeleccione, value: null }]
          catalogos.forEach(x => {
            this.cantonItem.push({ label: x.nombre, value: x })
          })
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
          () => {
          })
    }
}
