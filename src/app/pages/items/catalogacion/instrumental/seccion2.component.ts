import { Component, OnInit, Input } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Message, ConfirmationService } from 'primeng/primeng';
import { ItemService } from '../../../../services/item/items.service';
@Component({
  selector: 'instrumental-seccion2',
  templateUrl: './seccion2.html'
})
export class Seccion2InstrumentalComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];

  @Input() detalle = null;
  @Input() item = null;
  fotoecosistema = null;
  fotocartografia = null;
  es = this.properties.es;
  fotoregistros = null;
  fotoplano;
  fotoinstructivo;
  paisItem = [{ label: this.properties.labelSeleccione, value: null }]
  constructor(
    private domSanitizer: DomSanitizer,
    private _itemService: ItemService,
    private _catalogoService: CatalogoService,
  ) { }

  ngOnInit() {
    this.cargarCatalogos();
    if (this.detalle != null) {
      this.descargarFoto(6);
      this.descargarFoto(7);
      this.descargarFoto(8);
    }
  }

  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.paises])
      .subscribe((catalogos: any[]) => {

        catalogos.forEach(x => {
          this.paisItem.push({ label: x.nombre, value: x })
        });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }
  descargarFoto(tipo) {
    this._itemService.downloadFotografiaTipo(this.detalle.detalleid, tipo).
      subscribe((foto: any) => {

        if (tipo == 6) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoregistros = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if (tipo == 7) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoplano = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if (tipo == 8) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoinstructivo = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }

        //let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        //this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
  }

  fileChangeEvent(event, tipo = null) {
    console.log(event)
    let e = event.srcElement ? event.srcElement : event.target;
    let tipoLocal;
    let id = this.detalle.detalleid;


    this._itemService.subirFoto(tipo, e.files, id)
      .subscribe((foto: any) => {
        if (tipo == 6) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoregistros = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if (tipo == 7) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoplano = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if (tipo == 8) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoinstructivo = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista imagen.' }));
  }
}
