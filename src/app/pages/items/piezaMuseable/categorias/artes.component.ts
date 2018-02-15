import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'artes',
  templateUrl: './artes.html'
})
export class ArtesComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];

  @Input() detalle = null;
  @Input() item = null;
  materialesItem = []
  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
  ) { }

  ngOnInit() {
    this.cargarCatalogos()
  }

  cargarCatalogos() {
    
  }
}
