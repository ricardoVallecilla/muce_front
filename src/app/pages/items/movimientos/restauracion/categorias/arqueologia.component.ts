import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Properties } from '../../../../properties';
import { Constantes } from '../../../../constantes';
import { CatalogoService } from '../../../../../services/catalogos/catalogos.service';
import { Message, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'arqueologia-res',
  templateUrl: './arqueologia.html'
})
export class ArqueologiaResComponent implements OnInit, OnChanges {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];

  @Input() detalle = null;
  @Input() item = null;  
  @Input() materialesArqueologiaSelecionados = []
  @Output() enviadorCondicion = new EventEmitter();
  @Input() submitted = 0;
  materialesItem = [] 
  diccionarioImpresion={}
  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
  ) { }

  ngOnInit() {
    this.cargarCatalogos()
  }

  impr() {
    this.enviadorCondicion.emit(this.materialesArqueologiaSelecionados);

  }
  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.materialesArqueologia])
      .subscribe((catalogos: any[]) => {
        catalogos.forEach(x => {
          this.diccionarioImpresion[x.catalogoid+""]=x.nombre
        });
        this.materialesItem = catalogos
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }

  ngOnChanges() {

  }
}
