import { Component, OnInit, Input,Output,EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'istrumentalCientifico',
  templateUrl: './istrumentalCientifico.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class IstrumentalCientificoComponent implements OnInit, OnChanges {

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
  @Output() validacionFormulario = new EventEmitter();
  camposObligatorios=["descripcion","alto"  ,"largo","profundidad","diametro","espesor","peso","fechafabricacion"]
  constructor(
    private _catalogoService: CatalogoService,
    

  ) {


  }

  ngOnInit() {
   
    this.cargarCatalogos()
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
        if (this.materialesSelecionados.length==0){
          valido=valido*0
        }
        if (valido==1){
          this.validacionFormulario.emit(true)
        }else{
          this.validacionFormulario.emit(false)
        }
      }
      
    }

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
