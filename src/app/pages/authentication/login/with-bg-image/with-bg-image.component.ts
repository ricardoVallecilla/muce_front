import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/general/general.service'
import { Properties } from '../../../properties'
@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {
  
  usuario=null;
  password=null;

  constructor(private _generalService:GeneralService) { }

  ngOnInit() {
  }

  logear(){
    this._generalService.autenticar(this.usuario,this.password)
  }

}
