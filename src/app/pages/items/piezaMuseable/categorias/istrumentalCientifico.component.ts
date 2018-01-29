import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'istrumentalCientifico',
  templateUrl: './istrumentalCientifico.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class IstrumentalCientificoComponent implements OnInit {

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

  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
    

  ) {


  }

  ngOnInit() {
   
    this.cargarCatalogos()
  }

  impr() {
    this.enviadorCondicion.emit(this.materialesSelecionados);
  console.log(this.materialesSelecionados)
  }
  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.materialInstrumentos])
      .subscribe((catalogos: any[]) => {
        this.materialesItem=catalogos
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }

 
  


 
}
