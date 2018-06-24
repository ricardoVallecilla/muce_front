import { Component, OnInit, Input , Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'arte-seccion3',
  templateUrl: './seccion3.html'
})
export class Seccion3ArteComponent implements OnInit, OnChanges {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  @Input() submitted=0;
  @Output() validacionFormulario = new EventEmitter();
  camposObligatorios=["biografia"]
  es = this.properties.es;
  paisItem = [{ label: this.properties.labelSeleccione, value: null }]
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

  ngOnInit() {
    
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
          this.validacionFormulario.emit({indentificador:5,tab:"SEMBLANZA DEL AUTOR/A",valido:true})
        }else{
          this.validacionFormulario.emit({indentificador:5,tab:"SEMBLANZA DEL AUTOR/A",valido:false})
        }
      }
      
    }

  }
}
