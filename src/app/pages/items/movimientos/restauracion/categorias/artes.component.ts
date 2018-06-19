import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Properties } from '../../../../properties';
import { Constantes } from '../../../../constantes';
import { CatalogoService } from '../../../../../services/catalogos/catalogos.service';

@Component({
  selector: 'artes-res',
  templateUrl: './artes.html'
})
export class ArtesResComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  tecnicasItem = []
  @Output() enviadorCondicion = new EventEmitter();
  @Input() materialesArteSelecionados = []

  materialesItem = []
  diccionarioImpresion={}

  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

  ngOnInit() {
    this.cargarCatalogos()
  }

  impr() {
    this.enviadorCondicion.emit(this.materialesArteSelecionados);
  }


  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.materialesArte])
      .subscribe((catalogos: any[]) => {
        catalogos.forEach(x => {
          this.diccionarioImpresion[x.catalogoid+""] = x.nombre
        });
        this.materialesItem = catalogos
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
}
