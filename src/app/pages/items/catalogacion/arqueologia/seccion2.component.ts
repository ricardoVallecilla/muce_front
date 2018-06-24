import { Component, OnInit, Input , Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'arqueologia-seccion2',
  templateUrl: './seccion2.html'
})
export class Seccion2ArqueologiaComponent implements OnInit, OnChanges {

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
    this.cargarCatalogos();
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
          this.validacionFormulario.emit({indentificador:1,tab:"FORMA Y DISEÑO DEL BIEN ARQUEOLÓGICO",valido:true})
        }else{
          this.validacionFormulario.emit({indentificador:1,tab:"FORMA Y DISEÑO DEL BIEN ARQUEOLÓGICO",valido:false})
        }
      }
      
    }

  }
  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.paises])
      .subscribe((catalogos: any[]) => {
        
        catalogos.forEach(x => {
          this.paisItem.push({ label: x.nombre, value: x })
        });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
}
