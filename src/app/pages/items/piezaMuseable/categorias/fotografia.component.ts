import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'fotografia',
  templateUrl: './fotografia.html'
})
export class FotografiaComponent implements OnInit, OnChanges {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  @Input() submitted = 0;
  @Output() validacionFormulario = new EventEmitter();
  @Output() enviadorCondicion = new EventEmitter();
  @Input() materialesSelecionados = []
  camposObligatorios=["descripcion"]
  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

  ngOnInit() {
   
  }

  impr() {
    this.enviadorCondicion.emit(this.materialesSelecionados);

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    if(changes.submitted!=undefined){
      
      if(this.submitted>0){
        let valido=1
        this.camposObligatorios.forEach(x => {
          if (this.detalle[x]==null || this.detalle[x]==""){
            valido=valido*0
          }
        });
        if (valido==1){
          this.validacionFormulario.emit(true)
        }else{
          this.validacionFormulario.emit(false)
        }
      }
      
    }

  }
}
