import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Message, ConfirmationService } from 'primeng/primeng';
import { ItemService } from '../../../services/item/items.service';
import { PiezaMuseable } from '../../../models/piezaMuseable.model';
import { PiezaDetalle } from '../../../models/piezaDetalle.model';
@Component({
  selector: 'catalogacion',
  templateUrl: './catalogacion.html'
})
export class CatalogacionComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];

  @Input() detalle = null;
  @Input() item = null;
  piezaMuseable = null;
  es = this.properties.es;
  foto = null;
  fotodos;
  fototres = null;
  fotocuatro = null;
  @Output() enviadorCondicion = new EventEmitter();
  catalogoDetalle = [];
  paisItem = [{ label: this.properties.labelSeleccione, value: null }]
  constructor(

    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService,
  ) { }

  ngOnInit() {
    if (this.item != null) {
      this.buscar()
    }
  }

  buscar() {
    this.msgs = [];
    this._itemService.piezaMuseableByItem(this.item.itemid)
      .subscribe((piezas: any[]) => {
        if (piezas.length == 0) {
          this.confirmationService.confirm({
            key: "validacionInventario",
            message: "Primero debe completar el proceso de inventario de la pieza.",
            header: "Advertencia",
            icon: this.properties.iconAdvertencia,
          });
        } else {
          this.piezaMuseable = piezas[0];
          if (this.piezaMuseable.fechainventario != null) this.piezaMuseable.fechainventario = new Date(this.piezaMuseable.fechainventario)
          if (this.piezaMuseable.fecharevision != null) this.piezaMuseable.fecharevision = new Date(this.piezaMuseable.fecharevision)
          if (this.piezaMuseable.fechaaprobacion != null) this.piezaMuseable.fechaaprobacion = new Date(this.piezaMuseable.fechaaprobacion)
          this.buscarDetalle(this.piezaMuseable.piezamuseableid)
          this.descargarFoto(1);
          this.descargarFoto(9);
          this.descargarFoto(10);
          this.descargarFoto(11);


        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
  }

  volver() {
    this.enviadorCondicion.emit(false);
  }
  descargarFoto(tipo) {

    this._itemService.downloadFotografiaTipo(this.piezaMuseable.piezamuseableid, tipo).
      subscribe((foto: any) => {
        
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        switch (tipo) {
          case 1:
            this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
          case 9:
            this.fotodos = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
          case 10:
            this.fototres = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
          case 11:
            this.fotocuatro = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
        }

      }, (err: any) => {
      }, () => { });
  }
  buscarDetalle(piezaMuseableId) {
    let tipo;
    switch (this.item.categoriaid.catalogoid) {
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

    this._itemService.optenerDetalle(tipo, piezaMuseableId)
      .subscribe((detalle: any[]) => {
        if (detalle[0].fechafabricacion != undefined && detalle[0].fechafabricacion != null) detalle[0].fechafabricacion = new Date(detalle[0].fechafabricacion)
        this.detalle = detalle[0]
        this.detalle.piezamuseableid = this.piezaMuseable

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }


  guardar() {
    

    let piezaDetalle = new PiezaDetalle();
    let catalogosDetalle = null;
    let tipo;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        tipo = 6
        piezaDetalle.piezainstrumentaldetalle = this.detalle

        break;
      case this.constantes.arqueologia:
        tipo = 1
        piezaDetalle.piezaarqueologicadetalle = this.detalle
        break;
      case this.constantes.botanica:
        tipo = 2;
        piezaDetalle.piezabotanicadetalle = this.detalle
        catalogosDetalle = [];
        break;
      case this.constantes.entomologia:
        tipo = 3
        piezaDetalle.piezaentomologicadetalle = this.detalle
        break;
      default:
        break;
    }
    this._itemService.guardarCatalogacion(tipo, piezaDetalle, this.catalogoDetalle)
      .subscribe((piezas: any) => {
        this.enviadorCondicion.emit(true);
        //console.log('ok')

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }

  obtenerCatalogos(event) {
    this.catalogoDetalle = event;
  }

  fileChangeEvent(event, tipo = null) {
    
    let e = event.srcElement ? event.srcElement : event.target;
    let tipoLocal;
    let id;

    if (tipo != null) {
      tipoLocal = 1;
      id = this.piezaMuseable.piezamuseableid;
    }
    this._itemService.subirFoto(tipo, e.files, id)
      .subscribe((foto: any) => {
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        switch (tipo) {
          case 1:
            this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
          case 9:
            this.fotodos = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
          case 10:
            this.fototres = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
          case 11:
            this.fotocuatro = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            break;
        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista imagen.' }));
  }
}
