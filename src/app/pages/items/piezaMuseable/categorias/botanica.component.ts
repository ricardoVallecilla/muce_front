import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
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
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

  ngOnInit() {
    this.cargarCatalogos()
  }

  impr() {
    this.enviadorTecnicas.emit(this.tecnicaConservacionBotanicaSelecionados);
    console.log();
    


  
  }
  imprOrigen() {
    this.enviadorOrigenes.emit(this.origenesBotanicaSeleccionados);
    console.log();
  
  }
  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tecnicasConservacionBotanica,this.constantes.origenBotanica])
      .subscribe((catalogos: any[]) => {
        this.origenItem=catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.origenBotanica);
        this.tecnicasItem=catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tecnicasConservacionBotanica);
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
}
