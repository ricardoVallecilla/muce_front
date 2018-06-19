import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Properties } from '../../../../properties';
import { Constantes } from '../../../../constantes';
import { CatalogoService } from '../../../../../services/catalogos/catalogos.service';
import { Message, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'zoologia-res',
  templateUrl: './zoologia.html'
})
export class ZoologiaResComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  tecnicasItem = []
  @Input() submitted = 0;
  @Output() enviadorCondicion = new EventEmitter();
  @Input() tecnicasConservacionZooSelecionados = []

  sexoItem = [] 
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
    this.enviadorCondicion.emit(this.tecnicasConservacionZooSelecionados);
  }


  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tecnicasConservacionZoo])
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
