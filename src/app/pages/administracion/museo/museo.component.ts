import { Component, OnInit } from '@angular/core';
import { MuseoServices } from '../../../services/museo/museo.services';

@Component({
    selector: 'museo',
    templateUrl: './museo.html'
})
export class MuseoComponent implements OnInit {

    museos: any[];
    museo: any;
    bandera: number = 0;

    constructor(
        public museoService: MuseoServices
    ){}

    ngOnInit() {
        this.obtenerTodoMuseos();
    }

    obtenerTodoMuseos() {
        this.museoService.obtenerTodoMuseos()
            .subscribe((museos: any[]) => {
                this.museos = museos;
            },
            (err: any) => console.log(err),
            () => {});
    }

    modificarMuseo(museo) {
        this.museo = museo
        this.bandera = 1;
    }

    nuevo() {
        this.bandera = 1;
        this.museo = new Object();
    }
    
    guardar() {
        this.museoService.guardarMuseo(this.museo)
            .subscribe((museo: any) => {
            this.bandera=0;
            }, (err: any) => console.log(err),
            () => {
            });
    }
}