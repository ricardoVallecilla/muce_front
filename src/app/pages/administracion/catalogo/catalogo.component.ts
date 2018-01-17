import { Component, OnInit } from '@angular/core';
import {Properties} from '../../properties'

@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class CatalogoComponent implements OnInit {

  proerties= new Properties();
  title="Catalogos"
  acciones= this.proerties.labelLista+this.title;


  constructor() { }

  ngOnInit() {
  }

}
