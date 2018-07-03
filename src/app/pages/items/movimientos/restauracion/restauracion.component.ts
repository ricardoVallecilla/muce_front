import { Component, Input, EventEmitter, Output } from '@angular/core'
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks"
import { Item } from "../../../../models/item.model"
import { CatalogoService } from "../../../../services/catalogos/catalogos.service"
import { Properties } from "../../../properties"
import { Constantes } from "../../../constantes"
import { Message, ConfirmationService } from 'primeng/primeng'
import { ItemService } from "../../../../services/item/items.service";
import { PiezaMuseable } from "../../../../models/piezaMuseable.model";
import { EstadoBien } from "../../../../models/estadogeneral.model";
import { DomSanitizer } from "@angular/platform-browser";
import { DetalleCatalogo } from "../../../../models/detallecatalogo.model";
import { InstrumentalCientifico } from '../../../../models/categorias/instrumental.model';
import { Arqueologia } from '../../../../models/categorias/arqueologia.model';
import { Botanica } from '../../../../models/categorias/botanica.model';
import { Entomologia } from '../../../../models/categorias/entomologia.model';
import { FotografiaModel } from '../../../../models/categorias/fotografia.model';
import { GeologiaModel } from '../../../../models/categorias/geologia.model';
import { PaleontologiaModel } from '../../../../models/categorias/paleontologia.model';
import { ZoologiaModel } from '../../../../models/categorias/zoolgia.model';
import { Arte } from '../../../../models/categorias/arte.model';
import { PiezaDetalle } from '../../../../models/piezaDetalle.model';
import { EstilosReportes } from '../../../estiloImpresion';
import { RestauracionServices } from '../../../../services/restauracion/restauracion.services';
import { RestauracionModel } from '../../../../models/restauracion.model';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'restauracion',
    templateUrl: './restauracion.html'
  })
  export class RestauracionComponent implements OnInit {

  properties = new Properties();
  constantes = new Constantes();
  title = "Items"
  acciones = "Detalle de la pieza: ";
  msgs: Message[] = [];
  items = [];
  tipoItem = [{ label: this.properties.labelSeleccione, value: null }]
  categoriaItem = [{ label: this.properties.labelSeleccione, value: null }]
  grupoItem = [{ label: this.properties.labelSeleccione, value: null }]
  bandera = 0;
  grupo = null;
  categoria = null;
  @Input() item: Item = null;
  @Input() detalle = null;
  @Input() piezaMuseable: PiezaMuseable = null;
  estadoDelBien = [];
  estadosBienSelecionados = []
  estadoConservacionItem = []
  integridadPiezaItem = []
  es = this.properties.es;
  documento = null;
  provinciaItem = [{ label: this.properties.labelSeleccione, value: null }]
  cantonItem = [{ label: this.properties.labelSeleccione, value: null }]
  estadoConservacion = null;
  integridadPieza = null;
  @Input() submitted = 0;
  materialesSelecionados = []
  tecnicaConservacionSelecionados = []
  tecnicaConservacionBotanicaSelecionados = [];
  origenesBotanicaSeleccionados = [];
  materialesArteSelecionados = []
  tecnicasConservacionZooSelecionados = []
  materialesArqueologiaSelecionados = []
  fotoUno = null
  fotoDos = null
  fotoTres = null
  fotoCuatro = null
  @Output() enviadorCondicion = new EventEmitter();
  @Output() enviadorCatalogos = new EventEmitter();
  @Input() esCatalogacion = false;
  @Input() esCustodio = false;
  
  formularioValido = false;
  diccionarioImpresion = {}
  @Output() validacionFormulario = new EventEmitter();
  camposObligatorios=["provinciaid","cantonid","ciudadid","contenedor","direccion","numero","telefono","entidadinvestigadora","inventariadopor","fechainventario", "revisadopor"
  ,"fecharevision","aprobadopor","fechaaprobacion","registrofotograficopor",  "disposicioncontenedor","estadointegridad","estadoconservacionid"]

  restauracion: any
  restauracionList = []
  isRestaurador: any
  
  constructor(
    private domSanitizer: DomSanitizer,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService,
    private restauracionServices: RestauracionServices

  ) {

  }

  ngOnInit() {
    this.cargarCatalogos()
    if (this.item != null) {
      this.cargarEstadoBien();
      this.acciones = "Detalle de la pieza: " + this.item.nombre;
      this.buscar()
      this.obtenerLastRestauracion()
      
      if (this.item.estadoid.catalogoid == this.constantes.estadoItemRestauracion) {
        this.bandera = 0 
      } else { 
        this.obtenerRestauracionByItem()
      }
    }
  }

  verRol() {
    if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.properties.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
      if (persona.usuario.rolId.rolid == this.constantes.rolRestaurador) {
        this.isRestaurador = true
      }
    }
  }

  verRestauracion(id) {
    this.restauracion = new RestauracionModel(this.item)
    this.restauracionServices.obtenerRestauracionById(id)
      .subscribe((resultado: any) => {
        if (resultado) {
          this.restauracion = resultado
        }
        this.bandera = 0
      }, (err: any) => {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la última restauración.' })
      }, () => {})
  }

  obtenerLastRestauracion() {
    this.restauracion = new RestauracionModel(this.item)
    this.restauracionServices.obtenerLastRestauracionByItem(this.item.itemid)
      .subscribe((resultado: any) => {
        if (resultado) {
          this.restauracion = resultado
        }
      }, (err: any) => {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la última restauración.' })
      }, () => {})
  }

  obtenerRestauracionByItem() {
    this.bandera = 1 
    this.restauracionServices.obtenerRestauracionByItem(this.item.itemid)
      .subscribe((restauraciones: any[]) => {
        this.restauracionList = restauraciones
      }, (err: any) => {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de restauraciones.' })
      }, () => {})
  }

  buscar() {
    this.msgs = [];

    if (this.esCatalogacion) {
      if (this.piezaMuseable.fechainventario != null) this.piezaMuseable.fechainventario = new Date(this.piezaMuseable.fechainventario)
      if (this.piezaMuseable.fecharevision != null) this.piezaMuseable.fecharevision = new Date(this.piezaMuseable.fecharevision)
      if (this.piezaMuseable.fechaaprobacion != null) this.piezaMuseable.fechaaprobacion = new Date(this.piezaMuseable.fechaaprobacion)
      if (!this.esCatalogacion) this.descargarFotos();
      this.estadoConservacion = this.piezaMuseable.estadoconservacionid.catalogoid;
      this.integridadPieza = this.piezaMuseable.estadointegridad.catalogoid;
      if (!this.esCatalogacion) this.buscarEstadosBien(this.piezaMuseable.piezamuseableid);
      this.buscarCatalogosDetalle(this.piezaMuseable.piezamuseableid)
      this.buscarDetalle(this.piezaMuseable.piezamuseableid)
      this.obtenerCanton(this.piezaMuseable.provinciaid);
    } else {
      this._itemService.piezaMuseableByItem(this.item.itemid)
        .subscribe((piezas: any[]) => {
          if (piezas.length == 0) {
            this.piezaMuseable = new PiezaMuseable(this.item);
            this.crearDetalle();
          } else {
            this.piezaMuseable = piezas[0];
            if (this.piezaMuseable.fechainventario != null) this.piezaMuseable.fechainventario = new Date(this.piezaMuseable.fechainventario)
            if (this.piezaMuseable.fecharevision != null) this.piezaMuseable.fecharevision = new Date(this.piezaMuseable.fecharevision)
            if (this.piezaMuseable.fechaaprobacion != null) this.piezaMuseable.fechaaprobacion = new Date(this.piezaMuseable.fechaaprobacion)
            if (!this.esCatalogacion) this.descargarFotos();
            this.estadoConservacion = this.piezaMuseable.estadoconservacionid.catalogoid;
            this.integridadPieza = this.piezaMuseable.estadointegridad.catalogoid;
            if (!this.esCatalogacion) this.buscarEstadosBien(this.piezaMuseable.piezamuseableid);
            this.buscarCatalogosDetalle(this.piezaMuseable.piezamuseableid)
            this.buscarDetalle(this.piezaMuseable.piezamuseableid)
            this.obtenerCanton(this.piezaMuseable.provinciaid);

          }

        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
    }


  }

  descargarFotos() {
    this._itemService.downloadFotografiaTipo(this.piezaMuseable.piezamuseableid, 18).
      subscribe((foto: any) => {
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        this.fotoUno = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
    this._itemService.downloadFotografiaTipo(this.piezaMuseable.piezamuseableid, 19).
      subscribe((foto: any) => {
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        this.fotoDos = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
    this._itemService.downloadFotografiaTipo(this.piezaMuseable.piezamuseableid, 20).
      subscribe((foto: any) => {
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        this.fotoTres = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
    this._itemService.downloadFotografiaTipo(this.piezaMuseable.piezamuseableid, 21).
      subscribe((foto: any) => {
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        this.fotoCuatro = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }, (err: any) => {
      }, () => { });
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

      case this.constantes.arte:
      tipo = 10
      break

      default:
        break;
    }
    if (!this.esCatalogacion)
      this._itemService.optenerDetalle(tipo, piezaMuseableId)
        .subscribe((detalle: any[]) => {
          if (detalle[0].fechafabricacion != undefined && detalle[0].fechafabricacion != null) detalle[0].fechafabricacion = new Date(detalle[0].fechafabricacion)
          this.detalle = detalle[0]
          this.detalle.piezamuseableid = this.piezaMuseable

        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }));
  }

  buscarCatalogosDetalle(piezaMuseableId) {
    let nombresColumna = [];
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        nombresColumna = ['tipoMaterialInstrumental'];
        break;
      case this.constantes.arqueologia:
        nombresColumna = ['tipoMaterialArqueologia'];
        break;
      case this.constantes.botanica:
        nombresColumna = ['tecnicaConservacionBotanica', 'origenBotanica'];
        break;
      case this.constantes.entomologia:
        nombresColumna = ['tecnicaConservacionEntomologia'];
        break;
      case this.constantes.fotografia:
        nombresColumna = [''];
        break;
      case this.constantes.geologia:
        nombresColumna = [''];
        break;
      case this.constantes.peleontologia:
        nombresColumna = [''];
        break;
      case this.constantes.zoologia:
        nombresColumna = ['tecnicaConservacionEntomologia'];
        break;

      case this.constantes.arte:
        nombresColumna = [''];
        break;

      default:
        break;
    }
    if (nombresColumna.length > 0)
      this._itemService.catalogosDetalle(piezaMuseableId, nombresColumna)
        .subscribe((catalogos: DetalleCatalogo[]) => {

          switch (this.item.categoriaid.catalogoid) {
            case this.constantes.instrumental:
              this.materialesSelecionados = [];
              catalogos.forEach(x => {
                this.materialesSelecionados.push(x.piezacatalogoPk.catalogoid + "")

              });

              break;
            case this.constantes.arqueologia:
              this.materialesArqueologiaSelecionados = [];
              catalogos.forEach(x => {
                this.materialesArqueologiaSelecionados.push(x.piezacatalogoPk.catalogoid + "")

              });
              break;
            case this.constantes.botanica:
              this.origenesBotanicaSeleccionados = [];
              catalogos.filter(x => x.indetificadorcampo == "origenBotanica").forEach(x => {
                this.origenesBotanicaSeleccionados.push(x.piezacatalogoPk.catalogoid + "")

              });
              this.tecnicaConservacionBotanicaSelecionados = [];
              catalogos.filter(x => x.indetificadorcampo == "tecnicaConservacionBotanica").forEach(x => {
                this.tecnicaConservacionBotanicaSelecionados.push(x.piezacatalogoPk.catalogoid + "")

              });
              break;
            case this.constantes.entomologia:
              this.tecnicaConservacionSelecionados = [];
              catalogos.forEach(x => {
                this.tecnicaConservacionSelecionados.push(x.piezacatalogoPk.catalogoid + "")

              });
              break;

            case this.constantes.fotografia:
              catalogos.forEach(x => {
              });
              break;

            case this.constantes.geologia:
              catalogos.forEach(x => {
              });
              break;

            case this.constantes.peleontologia:
              catalogos.forEach(x => {
              });
              break;

            case this.constantes.zoologia:
              this.tecnicasConservacionZooSelecionados = [];
              catalogos.forEach(x => {
                this.tecnicasConservacionZooSelecionados.push(x.piezacatalogoPk.catalogoid + "")
              });
              break;

            case this.constantes.arte:
              this.materialesArteSelecionados = [];
              catalogos.forEach(x => {
                this.materialesArteSelecionados.push(x.piezacatalogoPk.catalogoid + "")

              });
              break;

            default:
              break;
          }
        }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
          () => {
          });
  }

  fileChangeEvent(event, tipo = null) {
    let e = event.srcElement ? event.srcElement : event.target;
    let tipoLocal;
    let id = this.piezaMuseable.piezamuseableid
    this._itemService.subirFoto(tipo, e.files, id)
      .subscribe((foto: any) => {
        if (tipo == 18) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoUno = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if (tipo == 19) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoDos = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if (tipo == 20) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoTres = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
        if (tipo == 21) {
          let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
          this.fotoCuatro = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista imagen.' }));
  }

  buscarEstadosBien(piezaMuseableId) {
    this._itemService.estadosBien(piezaMuseableId)
      .subscribe((estados: EstadoBien[]) => {
        this.estadosBienSelecionados = []
        estados.forEach(x => {
          this.estadosBienSelecionados.push(x.piezaCatalogoPk.catalogoid + "");
        });

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }
  setearEstadoConservacion() {

    this.piezaMuseable.estadoconservacionid = this.estadoConservacionItem.find(x => x.catalogoid == this.estadoConservacion)

  }
  setearIntegridadPieza() {
    this.piezaMuseable.estadointegridad = this.integridadPiezaItem.find(x => x.catalogoid == this.integridadPieza)

  }
  cargarEstadoBien() {
    let padreId;
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.arqueologia:
        padreId = this.constantes.arqueologiaEstadoBien;
        break;
      case this.constantes.botanica:
        padreId = this.constantes.botanicaEstadoBien;
        break;
      case this.constantes.entomologia:
        padreId = this.constantes.entomologiaEstadoBien;
        break;
      case this.constantes.fotografia:
        padreId = this.constantes.fotografiaEstadoBien;
        break;
      case this.constantes.geologia:
        padreId = this.constantes.geologiaEstadoBien;
        break;
      case this.constantes.instrumental:
        padreId = this.constantes.isntrumentalEstadoBien;
        break;
      case this.constantes.peleontologia:
        padreId = this.constantes.paleontologiaEstadoBien;
        break;
      case this.constantes.zoologia:
        padreId = this.constantes.zoologiaEstadoBien;
        break;

      case this.constantes.arte:
        padreId = this.constantes.arteEstadoBien;
        break;

      default:
        break;
    }
    this._catalogoService.obtenerCatalogosHijosPorPadres([padreId])
      .subscribe((catalogos: any[]) => {
        catalogos.forEach(x => {
          this.diccionarioImpresion[x.catalogoid + ""] = x.nombre
        });
        this.estadoDelBien = catalogos;

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de catalogos.' }));
  }

  crearDetalle() {
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        this.detalle = new InstrumentalCientifico(this.piezaMuseable)
        break;
      case this.constantes.arqueologia:
        this.detalle = new Arqueologia(this.piezaMuseable)
        break;
      case this.constantes.botanica:
        this.detalle = new Botanica(this.piezaMuseable)
        break;
      case this.constantes.entomologia:
        this.detalle = new Entomologia(this.piezaMuseable)
        break;
      case this.constantes.fotografia:
        this.detalle = new FotografiaModel(this.piezaMuseable)
        break;
      case this.constantes.geologia:
        this.detalle = new GeologiaModel(this.piezaMuseable)
        break;
      case this.constantes.peleontologia:
        this.detalle = new PaleontologiaModel(this.piezaMuseable)
        break;
      case this.constantes.zoologia:
        this.detalle = new ZoologiaModel(this.piezaMuseable)
        break;
      case this.constantes.arte:
        this.detalle = new Arte(this.piezaMuseable)
        break;
      default:
        break;
    }

  }

  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosHijosPorPadres([this.constantes.tipoIngreso, this.constantes.grupo,
    this.constantes.estadoConservacion, this.constantes.integridadPieza, this.constantes.ubicaciones])
      .subscribe((catalogos: any[]) => {
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.tipoIngreso).forEach(x => {
          this.tipoItem.push({ label: x.nombre, value: x })
        });
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.grupo).forEach(x => {
          this.grupoItem.push({ label: x.nombre, value: x })
        });
        this.estadoConservacionItem = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.estadoConservacion)
        this.estadoConservacionItem.forEach(x => {
          this.diccionarioImpresion[x.catalogoid + ""] = x.nombre
        });
        this.integridadPiezaItem = catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.integridadPieza)
        this.integridadPiezaItem.forEach(x => {
          this.diccionarioImpresion[x.catalogoid + ""] = x.nombre
        });
        catalogos.filter(x => x.catalogopadreid.catalogoid == this.constantes.ubicaciones).forEach(x => {
          this.provinciaItem.push({ label: x.nombre, value: x })
        });

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }
  obtenerCanton(event) {
    this._catalogoService.obtenerCatalogosHijosPorPadres([event.catalogoid])
      .subscribe((catalogos: any[]) => {
        this.cantonItem = [{ label: this.properties.labelSeleccione, value: null }]
        catalogos.forEach(x => {
          this.cantonItem.push({ label: x.nombre, value: x })
        });

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });
  }
  nuevo() {
    this.submitted = 0;
    this.msgs = [];
    this.acciones = this.properties.labelNuevo + " Item"
    this.bandera = 1;
    this.item = new Item();
  }
  subtmit() {
    this.submitted += 1;
  }

  obtenerCategorias(event) {
    let filtro
    switch (event.catalogoid) {
      case this.constantes.grupoCultural:
        filtro = this.constantes.grupoCulturalPadre;
        break;

      case this.constantes.grupoAdminsitrativo:
        filtro = this.constantes.grupoAdminsitrativoPadre;
        break;
      case this.constantes.grupoTecnologico:
        filtro = this.constantes.grupoTecnologicoPadre;
        break;
    }
    this.categoriaItem = [{ label: this.properties.labelSeleccione, value: null }]
    this._catalogoService.obtenerCatalogosHijosPorPadres([filtro])
      .subscribe((catalogos: any[]) => {
        catalogos.forEach(x => {
          this.categoriaItem.push({ label: x.nombre, value: x })
        });

      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Categorias.' }),
        () => {
        });
  }

  editarItem(item) {
    this.msgs = [];
    if (item.fechaadquisicion) item.fechaadquisicion = new Date(item.fechaadquisicion);
    if (item.fechaingreso) item.fechaingreso = new Date(item.fechaingreso);
    if (item.fecharestaurado) item.fecharestaurado = new Date(item.fecharestaurado);
    if (item.fecharegistro) item.fecharegistro = new Date(item.fecharegistro);
    this.acciones = this.properties.labelActualizar + " Item"
    this.item = item
    this.bandera = 1;
  }

  volver() {
    this.enviadorCondicion.emit(false);
  }

  obtenerDatoHijo(catalogos) {
    this.materialesSelecionados = catalogos;
    if (this.esCatalogacion) {
      let catalogosDetalle = [];
      this.materialesSelecionados.forEach(x => {
        catalogosDetalle.push(new DetalleCatalogo(x, "tipoMaterialInstrumental"))
      });
      this.enviadorCatalogos.emit(catalogosDetalle)
    }
  }


  obtenerDatoHijoEntomologia(catalogos) {
    this.tecnicaConservacionSelecionados = catalogos;
    if (this.esCatalogacion) {
      let catalogosDetalle = [];
      this.tecnicaConservacionSelecionados.forEach(x => {
        catalogosDetalle.push(new DetalleCatalogo(x, "tecnicaConservacionEntomologia"))
      });
      this.enviadorCatalogos.emit(catalogosDetalle);
    }
  }

  obtenerMaterialesArquelogica(catalogos) {
    this.materialesArqueologiaSelecionados = catalogos;
    if (this.esCatalogacion) {
      let catalogosDetalle = []
      this.materialesArqueologiaSelecionados.forEach(x => {
        catalogosDetalle.push(new DetalleCatalogo(x, "tipoMaterialArqueologia"))
      });
      this.enviadorCatalogos.emit(catalogosDetalle);
    }
  }

  obtenerMaterialesZoo(catalogos) {
    this.tecnicasConservacionZooSelecionados = catalogos;
    if (this.esCatalogacion) {
      let catalogosDetalle = []
      this.tecnicasConservacionZooSelecionados.forEach(x => {
        catalogosDetalle.push(new DetalleCatalogo(x, "tecnicaConservacionZoo"))
      });
      this.enviadorCatalogos.emit(catalogosDetalle);
    }
  }

  obtenerMaterialesArte(catalogos) {
    this.materialesArteSelecionados = catalogos;
    if (this.esCatalogacion) {
      let catalogosDetalle = []
      this.materialesArteSelecionados.forEach(x => {
        catalogosDetalle.push(new DetalleCatalogo(x, "materialesArte"))
      });
      this.enviadorCatalogos.emit(catalogosDetalle);
    }
  }

  optenerBotanicaOrigenes(catalogos) {
    this.origenesBotanicaSeleccionados = catalogos;
    if (this.esCatalogacion) this.enviadorCatalogos.emit(catalogos)
  }
  optenerBotanicaTecnicas(catalogos) {
    this.tecnicaConservacionBotanicaSelecionados = catalogos;
    if (this.esCatalogacion) this.enviadorCatalogos.emit(catalogos)
  }

  guardar() {
    this.msgs = [];
    this.restauracion.itemid = this.item
    this.restauracion.fecharestaurado =  new Date()
    this.restauracionServices.guardarRestauracion(this.restauracion)
      .subscribe((resultado: any) => {
        this.enviadorCondicion.emit(true);
      }, (err: any) => {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar la restauracion.' })
      }, () => {})
  }

  estadoSeleccionado(vale) {

    return true
  }

  print() {
    let printSectionId = "print-section"
    let popupWinindow
    let innerContents = document.getElementById(printSectionId).innerHTML;
    let innerContents2 = innerContents.replace('*:"', ':');
    popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    let tituloReporte = "FICHA INVENTARIO " + this.item.categoriaid.nombre.toUpperCase();
    let estilosReporte = new EstilosReportes()
    popupWinindow.document.write('<html><head><style>' + estilosReporte.estilo + '</style></head><body onload="window.print();window.close()"> <div >'
      + this.properties.cabezeraReporte(tituloReporte, this.item.numeroserie, this.item.codigocontrol)
      + innerContents2
      + '</div></html>');
    popupWinindow.document.close();
  }

  validarGuardar(formularioDetalleValido) {
    
    if(!this.esCatalogacion){
      if (formularioDetalleValido == true && this.formularioValido == true && ((this.piezaMuseable.piezamuseableid == null && this.documento != null) || this.piezaMuseable.piezamuseableid != null))
      this.guardar()
    }else{
      let formularioValido= 1;
      this.camposObligatorios.forEach(x => {
        if (this.piezaMuseable[x]==null || this.piezaMuseable[x]==""){
          formularioValido=formularioValido*0
        }
      });
      if(formularioDetalleValido == true && formularioValido == 1)
        this.validacionFormulario.emit(true)
      else
      this.validacionFormulario.emit(false)
    }
  }

  verHistorico() {
    this.bandera = 1
    this.obtenerRestauracionByItem()
  }
}
