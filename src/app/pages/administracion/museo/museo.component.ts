import { Component, OnInit } from '@angular/core';
import { MuseoServices } from '../../../services/museo/museo.services';
import { Properties } from '../../properties';
import { UsuarioService } from '../../../services/usuarios/usuarios.service';
import { Message } from 'primeng/primeng';
import { Constantes } from '../../constantes';
import { log } from 'util';

@Component({
    selector: 'museo',
    templateUrl: './museo.html'
})
export class MuseoComponent implements OnInit {

    museos: any[];
    museo: any;
    bandera: number = 0;
    documento: any
    custodios: any[]
    custodiosModel: any[]
    urlImage: any

    properties = new Properties();
    constantes = new Constantes();
    msgs: Message[] = []

    constructor(
        public museoService: MuseoServices,
        public usuarioService: UsuarioService
    ){}

    ngOnInit() {
        this.obtenerTodoMuseos();
    }

    obtenerTodoMuseos() {
        this.museoService.obtenerTodoMuseos()
            .subscribe((museos: any[]) => {
                this.museos = museos;
            },
            (err: any) => {
                this.msgs = []
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Museos.' })
            },
            () => {});
    }

    modificarMuseo(museo) {
        this.museo = museo
        this.obtenerCustodios()
        this.bandera = 1;
    }

    obtenerCustodios() {
        this.custodios = [{ label: this.properties.labelSeleccione, value: null }]
        this.usuarioService.obtenerUsuariosByRol(this.constantes.rolCustodio)
            .subscribe((custodios : any[]) => {
                this.custodiosModel = custodios;
                custodios.forEach(element => {
                    this.custodios.push({label: element.nombres, value: element.id })
                    this.custodios = this.custodios.slice()
                })
            },
            (err: any) => {
                this.msgs = []
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Custodios.' })
            },
            () => {})
    }

    nuevo() {
        this.bandera = 1;
        this.museo = new Object()
        this.museo.cutodioId = new Object()
        this.obtenerCustodios()
    }

    cancelar() {
        this.obtenerTodoMuseos()
    }
    
    guardar() {
        let index: number = this.custodiosModel.findIndex(x => x.value == this.museo.cutodioId.id);
        if (index != -1) {
            this.museo.cutodioId = this.custodiosModel[index]
        }
        this.museoService.guardarMuseo(this.museo, this.documento)
            .subscribe((museo: any) => {
                this.bandera=0;
            }, (err: any) => {
                this.msgs = []
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al guardar el museo.' })
            }, () => {
                this.obtenerTodoMuseos()
            });
    }

    fileChangeEvent(event) {
        var reader = new FileReader()
        let e = event.srcElement ? event.srcElement : event.target;
        this.documento = (e.files);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event:any) => {
              this.urlImage = event.target.result;
            }
        reader.readAsDataURL(event.target.files[0]);
        }
    }
}