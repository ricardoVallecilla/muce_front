import { Component, OnInit, Input } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'

import { Message, ConfirmationService } from 'primeng/primeng';
import { ItemService } from '../../../services/item/items.service';
import { PiezaMuseable } from '../../../models/piezaMuseable.model';
import { PiezaDetalle } from '../../../models/piezaDetalle.model';
@Component({
  selector: 'catalogacion',
  templateUrl: './catalogacion.html'
})
export class CatalogacionComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];

  @Input() detalle = null;
  @Input() item = null;
  piezaMuseable=null;
  es = this.properties.es;
  paisItem = [{ label: this.properties.labelSeleccione, value: null }]
  constructor(
    private _catalogoService: CatalogoService,
    private _itemService: ItemService,
  ) { }

  ngOnInit() {
    if (this.item != null) {
      this.buscar()
    }
  }

  buscar() {
    this.msgs = [];
    this._itemService.piezaMuseableByItem(this.item.itemid)
      .subscribe((piezas: any[]) => {
        if (piezas.length == 0) {

        } else {
          this.piezaMuseable = piezas[0];
          if (this.piezaMuseable.fechainventario != null) this.piezaMuseable.fechainventario = new Date(this.piezaMuseable.fechainventario)
          if (this.piezaMuseable.fecharevision != null) this.piezaMuseable.fecharevision = new Date(this.piezaMuseable.fecharevision)
          if (this.piezaMuseable.fechaaprobacion != null) this.piezaMuseable.fechaaprobacion = new Date(this.piezaMuseable.fechaaprobacion)
          this.buscarDetalle(this.piezaMuseable.piezamuseableid)


        }

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
  }
  buscarDetalle(piezaMuseableId) {
    let tipo;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.arqueologia:
        tipo = 1
        break;
      case this.constantes.botanica:
        tipo = 2
        break;
      case this.constantes.instrumental:
        tipo = 6;
        break;
      case this.constantes.entomologia:
        tipo = 3;
        break;
      case this.constantes.fotografia:
        tipo = 5
        break;
      case this.constantes.geologia:
        tipo = 7
        break;

      case this.constantes.peleontologia:
        tipo = 8
        break;

      case this.constantes.zoologia:
        tipo = 9
        break;

      default:
        break;
    }

    this._itemService.optenerDetalle(tipo, piezaMuseableId)
      .subscribe((detalle: any[]) => {
        if (detalle[0].fechafabricacion != undefined && detalle[0].fechafabricacion != null) detalle[0].fechafabricacion = new Date(detalle[0].fechafabricacion)
        this.detalle = detalle[0]
        this.detalle.piezamuseableid = this.piezaMuseable

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }


  guardar(){
    console.log(this.piezaMuseable);
    console.log(this.detalle);

    let piezaDetalle = new PiezaDetalle();
    let catalogosDetalle = null;
    let tipo;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        tipo = 6
        piezaDetalle.piezainstrumentaldetalle = this.detalle
        // if (this.materialesSelecionados.length > 0) {
        //   catalogosDetalle = [];
        //   this.materialesSelecionados.forEach(x => {
        //     catalogosDetalle.push(new DetalleCatalogo(x, "tipoMaterialInstrumental"))
        //   });
        // }
        break;
      case this.constantes.arqueologia:
        tipo = 1
        piezaDetalle.piezaarqueologicadetalle = this.detalle
        // if (this.materialesArqueologiaSelecionados.length > 0) {
        //   catalogosDetalle = [];
        //   this.materialesArqueologiaSelecionados.forEach(x => {
        //     catalogosDetalle.push(new DetalleCatalogo(x, "tipoMaterialArqueologia"))
        //   });
        // }
        break;
      case this.constantes.botanica:
        tipo = 2;
        piezaDetalle.piezabotanicadetalle = this.detalle
        catalogosDetalle = [];
        // if (this.tecnicaConservacionBotanicaSelecionados.length > 0) {
        //   this.tecnicaConservacionBotanicaSelecionados.forEach(x => {
        //     catalogosDetalle.push(new DetalleCatalogo(x, "tecnicaConservacionBotanica"))
        //   });
        // }
        // if (this.origenesBotanicaSeleccionados.length > 0) {
        //   this.origenesBotanicaSeleccionados.forEach(x => {
        //     catalogosDetalle.push(new DetalleCatalogo(x, "origenBotanica"))
        //   });
        // }
        break;
      case this.constantes.entomologia:
        tipo = 3
        piezaDetalle.piezaentomologicadetalle = this.detalle
        // if (this.tecnicaConservacionSelecionados.length > 0) {
        //   catalogosDetalle = [];
        //   this.tecnicaConservacionSelecionados.forEach(x => {
        //     catalogosDetalle.push(new DetalleCatalogo(x, "tecnicaConservacionEntomologia"))
        //   });
        // }
        break;
      default:
        break;
    }
    let estadosBien = null;
    this._itemService.guardarCatalogacion(tipo, piezaDetalle, catalogosDetalle)
      .subscribe((piezas: any) => {
        //this.enviadorCondicion.emit(true);
        console.log('ok')

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
      () => {
      });
  }
}
