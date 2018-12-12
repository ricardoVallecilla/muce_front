import { Component, OnInit, Input,Output,EventEmitter, SimpleChange } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
import { log } from 'util';
@Component({
  selector: 'botanica',
  templateUrl: './botanica.html'
})
export class BotanicaComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;
  @Input() tecnicaConservacionBotanicaSelecionados=[];
  @Input() origenesBotanicaSeleccionados=[]
  es = this.properties.es;
  @Output() enviadorTecnicas = new EventEmitter();
  @Output() enviadorOrigenes = new EventEmitter();
  origenItem=[];
  tecnicasItem=[];
  diccionarioImpresion={};

  @Input() submitted = 0;
  @Output() validacionFormulario = new EventEmitter();
  @Output() enviadorCondicion = new EventEmitter();
  @Input() materialesSelecionados = []
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

  ngOnInit() {
    this.cargarCatalogos()
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    if(changes.submitted!=undefined){
      
      if(this.submitted>0){
        let valido=1
        
        if (valido==1){
          this.validacionFormulario.emit(true)
        }else{
          this.validacionFormulario.emit(false)
        }
      }
      
    }

  }

  impr() {
    this.enviadorTecnicas.emit(this.tecnicaConservacionBotanicaSelecionados);
   
    


  
  }
  imprOrigen() {
    this.enviadorOrigenes.emit(this.origenesBotanicaSeleccionados);
    
  
  }
  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tecnicasConservacionBotanica,this.constantes.origenBotanica])
      .subscribe((catalogos: any[]) => {
        catalogos.forEach(x => {
          this.diccionarioImpresion[x.catalogoid+""]=x.nombre
        });
        this.origenItem=catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.origenBotanica);
        this.tecnicasItem=catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tecnicasConservacionBotanica);
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
}
