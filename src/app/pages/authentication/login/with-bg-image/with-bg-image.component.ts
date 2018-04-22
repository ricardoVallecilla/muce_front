import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/general/general.service'
import { Properties } from '../../../properties'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {
  
  usuario=null;
  password=null;
  error=false;
  constructor(private _generalService:GeneralService,private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let tipo = params['error'];
      if(tipo!=undefined){
        this.error=true
      }
    })
  }

  logear(){
    this._generalService.autenticar(this.usuario,this.password)
  }

}
