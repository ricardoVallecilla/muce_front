import { Component, OnInit } from '@angular/core';
import { Properties } from '../../properties'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class CatalogoComponent implements OnInit {

  proerties = new Properties();
  title = "Catalogos"
  acciones = this.proerties.labelLista + this.title;


  constructor(private _catalogoService: CatalogoService) { }

  ngOnInit() {

this.cargarCatalogos()
  }

  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosPadre()
    .subscribe((periodos: any[]) => {

    }, (err: any) => console.log(err),
      () => {
      });
  }

}
