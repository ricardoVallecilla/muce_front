import { Component, OnInit, Input } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { Item } from '../../../models/item.model'
import { PiezaMuseable } from '../../../models/piezaMuseable.model'
import { InstrumentalCientifico } from '../../../models/categorias/instrumental.model'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../services/item/items.service'
import { Message, ConfirmationService } from 'primeng/primeng';
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
  detalle=null;
  piezaMuseable: PiezaMuseable = null;
  estadoDelBien=[];
  estadosBienSelecionados=[]
  estadoConservacionItem=[]
  integridadPiezaItem=[]
  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
    private _itemService: ItemService

  ) {


  }

  ngOnInit() {
    if (this.item != null) {
      this.acciones = "Detalle de la pieza: " + this.item.nombre;
      this.buscar()
      this.cargarEstadoBien()
    }
    this.cargarCatalogos()
  }

  buscar() {
    this._itemService.piezaMuseableByItem(this.item.itemid)
      .subscribe((piezas: any[]) => {
        if (piezas.length == 0) {
          this.piezaMuseable = new PiezaMuseable(this.item);
          this.crearDetalle();
        } else {
          this.piezaMuseable = piezas[0];
        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }

  buscarDetalle(){

  }

  cargarEstadoBien(){
    let padreId;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.arqueologia:
        padreId=this.constantes.arqueologiaEstadoBien;
        break;
      case this.constantes.botanica:
        padreId=this.constantes.botanicaEstadoBien;
        break;
      case this.constantes.entomologia:
        padreId=this.constantes.entomologiaEstadoBien;
        break;
      case this.constantes.fotografia:
        padreId=this.constantes.fotografiaEstadoBien;
        break;
      case this.constantes.geologia:
        padreId=this.constantes.geologiaEstadoBien;
        break;
      case this.constantes.instrumental:
        padreId=this.constantes.isntrumentalEstadoBien;
        break;
      case this.constantes.peleontologia:
        padreId=this.constantes.paleontologiaEstadoBien;
        break;
      case this.constantes.zoologia:
        padreId=this.constantes.zoologiaEstadoBien;
        break;
      default:
        break;
    }
    this._catalogoService.obtenerCatalogosHijosPorPadres([padreId])
      .subscribe((catalogos: any[]) => {
        this.estadoDelBien=catalogos;
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }

  crearDetalle(){
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.arqueologia:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.botanica:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.entomologia:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.fotografia:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.geologia:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.peleontologia:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.zoologia:
        this.detalle= new InstrumentalCientifico(this.piezaMuseable)
        break;  
      default:
        break;
    }
    
  }

  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoIngreso, this.constantes.grupo,this.constantes.estadoConservacion,this.constantes.integridadPieza])
      .subscribe((catalogos: any[]) => {
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoIngreso).forEach(x => {
          this.tipoItem.push({ label: x.nombre, value: x })
        });
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupo).forEach(x => {
          this.grupoItem.push({ label: x.nombre, value: x })
        });
        this.estadoConservacionItem=catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.estadoConservacion)
        this.integridadPiezaItem=catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.integridadPieza)
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

  guardar() {
    this.msgs = [];
console.log(this.piezaMuseable);
console.log(this.detalle);

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
