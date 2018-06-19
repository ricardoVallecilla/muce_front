import { Component, OnInit, Input, EventEmitter, Output, SimpleChange, OnChanges } from '@angular/core';
import { Properties } from '../../../../properties';
import { Constantes } from '../../../../constantes';
import { CatalogoService } from '../../../../../services/catalogos/catalogos.service';
import { Message, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'paleontologia-res',
  templateUrl: './paleontologia.html'
})
export class PaleontologiaResComponent implements OnInit, OnChanges {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  @Input() submitted = 0;
  @Output() enviadorCondicion = new EventEmitter();
  @Input() materialesSelecionados = []
  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
    ) {}


    impr() {
      this.enviadorCondicion.emit(this.materialesSelecionados);
  
    }

  ngOnInit() {
   
  }

  ngOnChanges() {

  }
}
