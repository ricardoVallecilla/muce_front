import { Component, OnInit, Input , Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'foto-seccion4',
  templateUrl: './seccion4.html'
})
export class Seccion4FotoComponent implements OnInit, OnChanges {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  @Input() submitted=0;
  @Output() validacionFormulario = new EventEmitter();
  camposObligatorios=["elaboracion","decoracion","coloresusados","semioticocolores"]
  es = this.properties.es;
  paisItem = [{ label: this.properties.labelSeleccione, value: null }]
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

  ngOnInit() {
    
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    if(changes.submitted!=undefined){
      console.log(this.submitted);
      if(this.submitted>0){
        let valido=1
        this.camposObligatorios.forEach(x => {
          if (this.detalle[x]==null || this.detalle[x]==""){
            valido=valido*0
          }
        });
        
        if (valido==1){
          this.validacionFormulario.emit({indentificador:1,tab:"DESCRIPCIÓN FOTOGRÁFICA",valido:true})
        }else{
          this.validacionFormulario.emit({indentificador:1,tab:"DESCRIPCIÓN FOTOGRÁFICA",valido:false})
        }
      }
      
    }

  }
}
