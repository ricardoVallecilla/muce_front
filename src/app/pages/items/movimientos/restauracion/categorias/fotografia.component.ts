import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { Properties } from '../../../../properties';
import { Constantes } from '../../../../constantes';
import { CatalogoService } from '../../../../../services/catalogos/catalogos.service';
import { Message, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'fotografia-res',
  templateUrl: './fotografia.html'
})
export class FotografiaResComponent implements OnInit, OnChanges {

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

  ngOnInit() {
   
  }

  impr() {
    this.enviadorCondicion.emit(this.materialesSelecionados);

  }

  ngOnChanges() {

  }
}
