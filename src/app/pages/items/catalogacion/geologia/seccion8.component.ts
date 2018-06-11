import { Component, OnInit, Input } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Message, ConfirmationService } from 'primeng/primeng';
import { ItemService } from '../../../../services/item/items.service';
@Component({
  selector: 'geo-seccion8',
  templateUrl: './seccion8.html'
})
export class Seccion8GeoComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  fotoyacimiento=null;
  fotoyacimientoplano=null;
  provinciaItem=[{ label: this.properties.labelSeleccione, value: null }]
  es = this.properties.es;
  cantonItem=[{ label: this.properties.labelSeleccione, value: null }]
  constructor(
    private domSanitizer: DomSanitizer,
    private _itemService:ItemService,
    private _catalogoService: CatalogoService,
    ) {
     
    }

  ngOnInit() {
    this.cargarCatalogos();
    if(this.detalle!=null ){
        if (this.detalle.proviciaid)this.obtenerCanton(this.detalle.proviciaid)
        this.descargarFoto(12);
        this.descargarFoto(13);
    }
  }


  descargarFoto(tipo) {
    this._itemService.downloadFotografiaTipo(this.detalle.detalleid,tipo).
      subscribe((foto: any) => {
        
        if(tipo==2){
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
           this.fotoyacimiento = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if(tipo==3){
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
           this.fotoyacimientoplano = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        //let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        //this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
  }
  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.ubicaciones])
      .subscribe((catalogos: any[]) => {
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

  fileChangeEvent(event,tipo=null) {
    
    let e = event.srcElement ? event.srcElement : event.target;
    let tipoLocal;
    let id=this.detalle.detalleid;
    
    
    this._itemService.subirFoto(tipo,e.files,id)
      .subscribe((foto: any) => {
        if(tipo==2){
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
           this.fotoyacimiento = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if(tipo==3){
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
           this.fotoyacimientoplano = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista imagen.' }));
  }
}
