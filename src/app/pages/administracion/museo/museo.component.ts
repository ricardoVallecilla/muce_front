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
    coordinadors: any[]
    administrativos: any[]
    tecnologias: any[]
    custodiosModel: any[]
    coordinadoresModel: any[]
    administrativosModel: any[]
    tecnologicosModel: any[]
    urlImage: any
    acciones="Museo"
    properties = new Properties();
    constantes = new Constantes();
    msgs: Message[] = []

    cutodioId: any
    coordinadorId: any
    administrativoId: any
    tecnologiaId: any

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
        this.cutodioId = this.museo.cutodioId ? this.museo.cutodioId.id : null
        this.coordinadorId = this.museo.coordinadorId ? this.museo.coordinadorId.id : null
        this.administrativoId = this.museo.administrativoId ? this.museo.administrativoId.id : null
        this.tecnologiaId = this.museo.tecnologiaId ? this.museo.tecnologiaId.id : null

        this.obtenerCustodios()
        this.obtenerCoordinadores()
        this.obtenerAdministrativos()
        this.obtenerTecnologicos()
        this.bandera = 1;
    }

    obtenerCustodios() {
        this.custodios = [{ label: this.properties.labelSeleccione, value: null }]
        this.usuarioService.getRolUsuarioByUserId(this.constantes.rolCustodio)
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

    obtenerCoordinadores() {
        this.coordinadors = [{ label: this.properties.labelSeleccione, value: null }]
        this.usuarioService.getRolUsuarioByUserId(this.constantes.rolCoordinador)
            .subscribe((coordinares : any[]) => {
                this.coordinadoresModel = coordinares;
                coordinares.forEach(element => {
                    this.coordinadors.push({label: element.nombres, value: element.id })
                    this.coordinadors = this.coordinadors.slice()
                })
            },
            (err: any) => {
                this.msgs = []
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Coordinadores.' })
            },
            () => {})
    }

    obtenerAdministrativos() {
        this.administrativos = [{ label: this.properties.labelSeleccione, value: null }]
        this.usuarioService.getRolUsuarioByUserId(this.constantes.rolAdministrativo)
            .subscribe((administrativos : any[]) => {
                this.administrativosModel = administrativos;
                administrativos.forEach(element => {
                    this.administrativos.push({label: element.nombres, value: element.id })
                    this.administrativos = this.administrativos.slice()
                })
            },
            (err: any) => {
                this.msgs = []
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Administrativos.' })
            },
            () => {})
    }

    obtenerTecnologicos() {
        this.tecnologias = [{ label: this.properties.labelSeleccione, value: null }]
        this.usuarioService.getRolUsuarioByUserId(this.constantes.rolTecnologia)
            .subscribe((tecnologicos : any[]) => {
                this.tecnologicosModel = tecnologicos;
                tecnologicos.forEach(element => {
                    this.tecnologias.push({label: element.nombres, value: element.id })
                    this.tecnologias = this.tecnologias.slice()
                })
            },
            (err: any) => {
                this.msgs = []
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Tecnologicos.' })
            },
            () => {})
    }

    nuevo() {
        this.bandera = 1;
        this.museo = new Object()
        this.obtenerCustodios()
        this.obtenerCoordinadores()
        this.obtenerAdministrativos()
        this.obtenerTecnologicos()
    }

    cancelar() {
        this.obtenerTodoMuseos()
        this.bandera = 0
    }

    eliminar() {
        this.museoService.eliminar(this.museo.museoid)
            .subscribe((resultado: any) => {
                this.bandera = 0
                
            }, (err: any) => {
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el museo.' })
            }, () => {
                this.obtenerTodoMuseos()
            })
    }
    
    guardar() { 
        let museoGuardar = this.museo

        if (this.cutodioId) {
            let index1: number = this.custodiosModel.findIndex(x => x.id == this.cutodioId);
            if (index1 != -1) {
                museoGuardar.cutodioId = this.custodiosModel[index1]
            }
        } else {
            museoGuardar.cutodioId = null
        }

        if (this.coordinadorId) {
            let index2: number = this.coordinadoresModel.findIndex(x => x.id == this.coordinadorId);
            if (index2 != -1) {
                museoGuardar.coordinadorId = this.coordinadoresModel[index2]
            } 
        } else {
            museoGuardar.coordinadorId = null
        }

        if (this.administrativoId) {
            let index3: number = this.administrativosModel.findIndex(x => x.id == this.administrativoId);
            if (index3 != -1) {
                museoGuardar.administrativoId = this.administrativosModel[index3]
            }
        } else {
            museoGuardar.administrativoId = null
        }

        if (this.tecnologiaId) {
            let index4: number = this.tecnologicosModel.findIndex(x => x.id == this.tecnologiaId);
            if (index4 != -1) {
                museoGuardar.tecnologiaId = this.tecnologicosModel[index4]
            } 
        } else {
            museoGuardar.tecnologiaId = null
        }
        this.museoService.guardarMuseo(museoGuardar, this.documento)
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