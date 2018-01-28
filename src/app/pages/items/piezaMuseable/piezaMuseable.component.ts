import { Component, OnInit, Input } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { Item } from '../../../models/item.model'
import { PiezaDetalle } from '../../../models/piezaDetalle.model'
import { PiezaMuseable } from '../../../models/piezaMuseable.model'
import { InstrumentalCientifico } from '../../../models/categorias/instrumental.model'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../services/item/items.service'
import { Message, ConfirmationService } from 'primeng/primeng';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
@Component({
  selector: 'piezaMuseable',
  templateUrl: './piezaMuseable.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class PiezaMuseableComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  items = [];
  tipoItem = [{ label: this.properties.labelSeleccione, value: null }]
  categoriaItem = [{ label: this.properties.labelSeleccione, value: null }]
  grupoItem = [{ label: this.properties.labelSeleccione, value: null }]
  bandera = 0;
  grupo = null;
  categoria = null;
  @Input() item: Item = null;
  detalle = null;
  piezaMuseable: PiezaMuseable = null;
  estadoDelBien = [];
  estadosBienSelecionados = []
  estadoConservacionItem = []
  integridadPiezaItem = []
  es = this.properties.es;
  documento = null;
  provinciaItem = [{ label: this.properties.labelSeleccione, value: null }]
  cantonItem = [{ label: this.properties.labelSeleccione, value: null }]
  estadoConservacion = null;
  integridadPieza = null;
  foto = null;
  constructor(
    private domSanitizer: DomSanitizer,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService

  ) {


  }

  ngOnInit() {
    this.cargarCatalogos()
    if (this.item != null) {
      this.cargarEstadoBien();
      this.acciones = "Detalle de la pieza: " + this.item.nombre;
      this.buscar()
      
    }
    
  }

  buscar() {
    this._itemService.piezaMuseableByItem(this.item.itemid)
      .subscribe((piezas: any[]) => {
        if (piezas.length == 0) {
          this.piezaMuseable = new PiezaMuseable(this.item);
          this.crearDetalle();
        } else {
          this.piezaMuseable = piezas[0];
          this.estadoConservacion=this.piezaMuseable.estadoconservacionid.catalogoid;
          this.integridadPieza=this.piezaMuseable.estadointegridad.catalogoid;
          this.obtenerCanton(this.piezaMuseable.provinciaid)
          this.buscarDetalle(this.piezaMuseable.piezamuseableid)
          this.descargarFoto();
        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
  descargarFoto(){
    this._itemService.downloadFotografia(this.piezaMuseable.piezamuseableid).
          subscribe((foto: any) => {
            let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
            this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          }, (err: any) => {
          }, () => { });
  }
  buscarDetalle(piezaMuseableId) {
    let tipo;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        tipo=6;
        break;
      case this.constantes.arqueologia:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.botanica:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      default:
        break;
    }

    this._itemService.optenerDetalle(tipo,piezaMuseableId)
      .subscribe((detalle: any[]) => {
       this.detalle=detalle=[0]

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
  setearEstadoConservacion() {

    this.piezaMuseable.estadoconservacionid = this.estadoConservacionItem.find(x => x.catalogoid == this.estadoConservacion)
    console.log(this.piezaMuseable.estadoconservacionid);
  }
  setearIntegridadPieza() {
    this.piezaMuseable.estadointegridad = this.integridadPiezaItem.find(x => x.catalogoid == this.integridadPieza)
    console.log(this.piezaMuseable.estadointegridad);
  }
  cargarEstadoBien() {
    let padreId;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        padreId = this.constantes.isntrumentalEstadoBien;

        break;

      default:
        break;
    }
    this._catalogoService.obtenerCatalogosHijosPorPadres([padreId])
      .subscribe((catalogos: any[]) => {
        this.estadoDelBien = catalogos;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de catalogos.' }),
      () => {
      });
  }

  crearDetalle() {
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.arqueologia:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.botanica:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      default:
        break;
    }

  }

  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoIngreso, this.constantes.grupo,
    this.constantes.estadoConservacion, this.constantes.integridadPieza, this.constantes.ubicaciones])
      .subscribe((catalogos: any[]) => {
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoIngreso).forEach(x => {
          this.tipoItem.push({ label: x.nombre, value: x })
        });
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupo).forEach(x => {
          this.grupoItem.push({ label: x.nombre, value: x })
        });
        this.estadoConservacionItem = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.estadoConservacion)
        this.integridadPiezaItem = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.integridadPieza)
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.ubicaciones).forEach(x => {
          this.provinciaItem.push({ label: x.nombre, value: x })
        });

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
  obtenerCanton(event) {
    this._catalogoService.obtenerCatalogosHijosPorPadres([event.catalogoid])
      .subscribe((catalogos: any[]) => {
        this.cantonItem = [{ label: this.properties.labelSeleccione, value: null }]
        catalogos.forEach(x => {
          this.cantonItem.push({ label: x.nombre, value: x })
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

  obtenerCategorias(event) {
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


  fileChangeEvent(event) {
    console.log(event)
    let e = event.srcElement ? event.srcElement : event.target;
    this.documento = (e.files);

    this.msgs = [];


  }
  guardar() {
    this.msgs = [];
    console.log(this.piezaMuseable);
    console.log(this.detalle);
    let piezaDetalle = new PiezaDetalle();

    let tipo;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        tipo = 6
        piezaDetalle.piezainstrumentaldetalle = this.detalle
        break;
      case this.constantes.arqueologia:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.botanica:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      default:
        break;
    }
    console.log(JSON.stringify(piezaDetalle))
    this._itemService.guardarPiezaMuseableDetalle(tipo, piezaDetalle, this.documento)
      .subscribe((piezas: any) => {
        console.log('ok')

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
    // if (this.item.itemid == null) {
    //   //this.item.museoid = this.museo;
    //   this.item.grupoid = this.grupo;
    //   this.item.categoriaid = this.categoria

    // }

    // this._itemService.guardarItem(this.item)
    //   .subscribe((item: any) => {
    //     this.item = item
    //     this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Item Actualizado.' });
    //     this.volver()


    //   }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el Item.' }),
    //   () => {
    //   });
  }
}
