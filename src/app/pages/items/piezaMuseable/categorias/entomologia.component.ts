import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'entomologia',
  templateUrl: './entomologia.html'
})
export class EntomologiaComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  @Input() tecnicaConservacionSelecionados=[]
  @Output() enviadorCondicion = new EventEmitter();
  tecnicasItem=[]
  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

    ngOnInit() {
   
      this.cargarCatalogos()
    }
  
    impr() {
      this.enviadorCondicion.emit(this.tecnicaConservacionSelecionados);
    console.log(this.tecnicaConservacionSelecionados)
    }
    cargarCatalogos() {
      this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tecnicasConservacionEntomologia])
        .subscribe((catalogos: any[]) => {
          this.tecnicasItem=[]
          this.tecnicasItem=catalogos
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
    }
}
