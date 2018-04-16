import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'arqueologia',
  templateUrl: './arqueologia.html'
})
export class ArqueologiaComponent implements OnInit, OnChanges {

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
  @Output() validacionFormulario = new EventEmitter();
  camposObligatorios=["categoriamorfofuncional","tipomaterial","tecnicamanofactura","tecnicadecorativa","cronologia","cultura","alto"
  ,"largo","ancho","diametro","espesor","peso","descripcion","periodohistorico"]
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
        if (this.materialesArqueologiaSelecionados.length==0){
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
}
