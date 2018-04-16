import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { Item } from '../../../models/item.model'
import { EstadoBien } from '../../../models/estadogeneral.model'
import { DetalleCatalogo } from '../../../models/detallecatalogo.model'
import { PiezaDetalle } from '../../../models/piezaDetalle.model'
import { PiezaMuseable } from '../../../models/piezaMuseable.model'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../services/item/items.service'
import { Message, ConfirmationService } from 'primeng/primeng';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { EstilosReportes } from '../../estiloImpresion';
@Component({
  selector: 'bajas',
  templateUrl: './bajas.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class BajasComponent implements OnInit {

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
  @Input() detalle = null;
  @Input() piezaMuseable: PiezaMuseable = null;
  motivos
  motivosSeleccionados=[]
  es = this.properties.es;
  documento = null;
  
  estadoConservacion = null;
  integridadPieza = null;
  @Input() submitted = 0;
  
  foto = null;
  bajaItem=null;
  @Output() enviadorCondicion = new EventEmitter();
  
  formularioValido = false;
  diccionarioImpresion = {}
  constructor(
    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService

  ) {


  }

  ngOnInit() {
    this.cargarCatalogos()
    if (this.item != null) {
      this.acciones = "Detalle de la pieza: " + this.item.nombre;
      this.buscar()

    }

  }

  buscar() {
    this.msgs = [];
    this._itemService.piezaMuseableByItem(this.item.itemid)
        .subscribe((piezas: any[]) => {
          if (piezas.length == 0) {
            this.piezaMuseable = new PiezaMuseable(this.item);
            
          } else {
            this.piezaMuseable = piezas[0];
            if (this.piezaMuseable.fechainventario != null) this.piezaMuseable.fechainventario = new Date(this.piezaMuseable.fechainventario)
            if (this.piezaMuseable.fecharevision != null) this.piezaMuseable.fecharevision = new Date(this.piezaMuseable.fecharevision)
            if (this.piezaMuseable.fechaaprobacion != null) this.piezaMuseable.fechaaprobacion = new Date(this.piezaMuseable.fechaaprobacion)
            this.descargarFoto();
           

          }

        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));

        this._itemService.itemBajaByItem(this.item.itemid)
        .subscribe((piezas: any[]) => {
          if (piezas.length == 0) {
            this.bajaItem={itemid:this.item.itemid}
            
          } else {
            piezas[0].fecha=new Date(piezas[0].fecha)
            piezas[0].fechaaprobacion=new Date(piezas[0].fechaaprobacion)
            this.motivosSeleccionados=JSON.parse(piezas[0].motivos)
            this.bajaItem = piezas[0];
           
           

          }

        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));

  }
  descargarFoto() {
    this._itemService.downloadFotografia(this.piezaMuseable.piezamuseableid).
      subscribe((foto: any) => {
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
  }
  
 
 

  
  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.motivosBaja])
      .subscribe((catalogos: any[]) => {
        this.motivos=catalogos
        catalogos.forEach(x => {
          this.diccionarioImpresion[x.catalogoid]=x.nombre
        });
        
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }
  
  nuevo() {
    this.submitted = 0;
    this.msgs = [];
    this.acciones = this.properties.labelNuevo + " Item"
    this.bandera = 1;
    this.item = new Item();
  }
  subtmit() {
    this.submitted += 1;
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
    this.enviadorCondicion.emit(false);
  }

  

  fileChangeEvent(event) {

    let e = event.srcElement ? event.srcElement : event.target;
    this.documento = (e.files);

    this.msgs = [];


  }
  guardar() {
    this.msgs = [];

  
    this._itemService.guardaritemBaja(this.bajaItem)
      .subscribe((piezas: any) => {
        this.enviadorCondicion.emit(true);


      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });

  }
  estadoSeleccionado(vale) {

    return true
  }


  confirmar(){
    this.bajaItem.motivos=JSON.stringify(this.motivosSeleccionados);
    console.log(this.bajaItem);

    this.confirmationService.confirm({
      key: "confirmarNotificacion",
      message: "¿Está seguro que desea dar de baja a este Item '<strong>"+this.item.nombre.toUpperCase()+"</strong>? Una vez dado de baja no se podra usar en movimientos.",
      header: "Advertencia",
      icon: this.properties.iconAdvertencia,
    });
    
  }

  print() {
    let printSectionId = "print-section"
    let popupWinindow
    let innerContents = document.getElementById(printSectionId).innerHTML;
    let innerContents2 = innerContents.replace('*:"', ':');
    popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    let tituloReporte = "FICHA INVENTARIO " + this.item.categoriaid.nombre.toUpperCase();
    let estilosReporte = new EstilosReportes()
    popupWinindow.document.write('<html><head><style>' + estilosReporte.estilo + '</style></head><body onload="window.print();window.close()"> <div >'
      + this.properties.cabezeraReporte(tituloReporte, this.item.numeroserie, this.item.codigocontrol)
      + innerContents2
      + '</div></html>');
    popupWinindow.document.close();
  }


}
