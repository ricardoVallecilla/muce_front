import { Component, OnInit, Input,Output,EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Properties } from '../../../../properties';
import { Constantes } from '../../../../constantes';
import { CatalogoService } from '../../../../../services/catalogos/catalogos.service';
import { Message, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'istrumentalCientifico-res',
  templateUrl: './istrumentalCientifico.html'
})
export class IstrumentalCientificoResComponent implements OnInit, OnChanges {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  items = [];
  materialesItem=[];
  @Input() materialesSelecionados=[]
  @Output() enviadorCondicion = new EventEmitter();
  bandera = 0;
  grupo = null;
  categoria = null;
  @Input() detalle = null;
  @Input() item = null;
  diccionarioImpresion={}
  es = this.properties.es;
  @Input() submitted = 0;
  constructor(private _catalogoService: CatalogoService) {
  }

  ngOnInit() {
    this.cargarCatalogos()
  }

  ngOnChanges() {

  }

  impr() {
    this.enviadorCondicion.emit(this.materialesSelecionados);
  }

  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.materialInstrumentos])
      .subscribe((catalogos: any[]) => {
        catalogos.forEach(x => {
          this.diccionarioImpresion[x.catalogoid+""]=x.nombre
        });
        this.materialesItem=catalogos
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
}
