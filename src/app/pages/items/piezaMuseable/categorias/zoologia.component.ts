import { Component, OnInit, Input } from '@angular/core';
import { Properties } from '../../../properties'
import { Constantes } from '../../../constantes'
import { CatalogoService } from '../../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'zoologia',
  templateUrl: './zoologia.html'
})
export class ZoologiaComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  
  @Input() detalle = null;
  @Input() item = null;

  tecnicasItem = []

  es = this.properties.es;
  constructor(
    private _catalogoService: CatalogoService,
    ) {}

  ngOnInit() {
    this.cargarCatalogos()
  }

  cargarCatalogos() {
    // this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.materialesArqueologia])
    //   .subscribe((catalogos: any[]) => {
    //     this.tecnicasItem = catalogos
    //   }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
    //   () => {
    //   });

    this.tecnicasItem = [{label: 'Piel vaciada', value: 1}, {label: 'Piel naturalizada', value: 2},{label: 'Esqueleto', value: 3}]
  }

}
