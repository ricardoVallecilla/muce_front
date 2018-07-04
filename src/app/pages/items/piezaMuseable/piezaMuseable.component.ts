import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Properties } from '../../properties'
import { Constantes } from '../../constantes'
import { Item } from '../../../models/item.model'
import { EstadoBien } from '../../../models/estadogeneral.model'
import { DetalleCatalogo } from '../../../models/detallecatalogo.model'
import { PiezaDetalle } from '../../../models/piezaDetalle.model'
import { PiezaMuseable } from '../../../models/piezaMuseable.model'
import { InstrumentalCientifico } from '../../../models/categorias/instrumental.model'
import { Entomologia } from '../../../models/categorias/entomologia.model'
import { Botanica } from '../../../models/categorias/botanica.model'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { ItemService } from '../../../services/item/items.service'
import { Message, ConfirmationService } from 'primeng/primeng';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Arqueologia } from '../../../models/categorias/arqueologia.model';
import { FotografiaModel } from '../../../models/categorias/fotografia.model';
import { GeologiaModel } from '../../../models/categorias/geologia.model';
import { PaleontologiaModel } from '../../../models/categorias/paleontologia.model';
import { ZoologiaModel } from '../../../models/categorias/zoolgia.model';
import { EstilosReportes } from '../../estiloImpresion';
import { Arte } from '../../../models/categorias/arte.model';
@Component({
  selector: 'piezaMuseable',
  templateUrl: './piezaMuseable.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class PiezaMuseableComponent implements OnInit {

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
  foto = null;
  @Output() enviadorCondicion = new EventEmitter();
  @Output() enviadorCatalogos = new EventEmitter();
  @Input() esCatalogacion = false;
  formularioValido = false;
  diccionarioImpresion = {}
  @Output() validacionFormulario = new EventEmitter();
  @Input() esCustodio = false;
  camposObligatorios=["provinciaid","cantonid","ciudadid","contenedor","direccion","numero","telefono","entidadinvestigadora","inventariadopor","fechainventario", "revisadopor"
  ,"fecharevision","aprobadopor","fechaaprobacion","registrofotograficopor",  "disposicioncontenedor","estadointegridad","estadoconservacionid"]
  constructor(
    private domSanitizer: DomSanitizer,
    private _catalogoService: CatalogoService,
    private _itemService: ItemService

  ) {


  }

  ngOnInit() {
    this.cargarCatalogos()
    if (this.item != null) {
      this.cargarEstadoBien();
      this.acciones = "Detalle de la pieza: " + this.item.nombre;
      this.buscar()

    }

  }

  buscar() {
    this.msgs = [];

    if (this.esCatalogacion) {
      if (this.piezaMuseable.fechainventario != null) this.piezaMuseable.fechainventario = new Date(this.piezaMuseable.fechainventario)
      if (this.piezaMuseable.fecharevision != null) this.piezaMuseable.fecharevision = new Date(this.piezaMuseable.fecharevision)
      if (this.piezaMuseable.fechaaprobacion != null) this.piezaMuseable.fechaaprobacion = new Date(this.piezaMuseable.fechaaprobacion)
      if (!this.esCatalogacion) this.descargarFoto();
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
            if (!this.esCatalogacion) this.descargarFoto();
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
  descargarFoto() {
    this._itemService.downloadFotografia(this.piezaMuseable.piezamuseableid).
      subscribe((foto: any) => {
        let blob = new Blob([foto.blob()], { type: 'image/jpeg' });
        this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
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


  fileChangeEvent(event) {

    let e = event.srcElement ? event.srcElement : event.target;
    this.documento = (e.files);

    this.msgs = [];


  }
  guardar() {
    this.msgs = [];

    let piezaDetalle = new PiezaDetalle();
    let catalogosDetalle = null;
    let tipo;
    if(this.detalle.detalleid==null)this.piezaMuseable.fecharegistroinventario= new Date()
    switch (this.item.categoriaid.catalogoid) {
      case this.constantes.instrumental:
        tipo = 6
        piezaDetalle.piezainstrumentaldetalle = this.detalle
        if (this.materialesSelecionados.length > 0) {
          catalogosDetalle = [];
          this.materialesSelecionados.forEach(x => {
            catalogosDetalle.push(new DetalleCatalogo(x, "tipoMaterialInstrumental"))
          });
        }
        break;
      case this.constantes.arqueologia:
        tipo = 1
        piezaDetalle.piezaarqueologicadetalle = this.detalle
        if (this.materialesArqueologiaSelecionados.length > 0) {
          catalogosDetalle = [];
          this.materialesArqueologiaSelecionados.forEach(x => {
            catalogosDetalle.push(new DetalleCatalogo(x, "tipoMaterialArqueologia"))
          });
        }
        break;
      case this.constantes.botanica:
        tipo = 2;
        piezaDetalle.piezabotanicadetalle = this.detalle
        catalogosDetalle = [];
        if (this.tecnicaConservacionBotanicaSelecionados.length > 0) {
          this.tecnicaConservacionBotanicaSelecionados.forEach(x => {
            catalogosDetalle.push(new DetalleCatalogo(x, "tecnicaConservacionBotanica"))
          });
        }
        if (this.origenesBotanicaSeleccionados.length > 0) {
          this.origenesBotanicaSeleccionados.forEach(x => {
            catalogosDetalle.push(new DetalleCatalogo(x, "origenBotanica"))
          });
        }
        break;
      case this.constantes.entomologia:
        tipo = 3
        piezaDetalle.piezaentomologicadetalle = this.detalle
        if (this.tecnicaConservacionSelecionados.length > 0) {
          catalogosDetalle = [];
          this.tecnicaConservacionSelecionados.forEach(x => {
            catalogosDetalle.push(new DetalleCatalogo(x, "tecnicaConservacionEntomologia"))
          });
        }
        break;
      case this.constantes.fotografia:
        tipo = 5
        piezaDetalle.piezafotograficadetalle = this.detalle
        if (this.tecnicaConservacionSelecionados.length > 0) {
          catalogosDetalle = [];
        }
        break;
      case this.constantes.geologia:
        tipo = 7
        piezaDetalle.piezageologicadetalle = this.detalle
        if (this.tecnicaConservacionSelecionados.length > 0) {
          catalogosDetalle = [];
        }
        break;
      case this.constantes.peleontologia:
        tipo = 8
        piezaDetalle.piezapaleontologicadetalle = this.detalle
        if (this.tecnicaConservacionSelecionados.length > 0) {
          catalogosDetalle = [];
        }
        break;
      case this.constantes.zoologia:
        tipo = 9
        piezaDetalle.piezazoologicadetalle = this.detalle
        if (this.tecnicasConservacionZooSelecionados.length > 0) {
          catalogosDetalle = [];
          this.tecnicasConservacionZooSelecionados.forEach(x => {
            catalogosDetalle.push(new DetalleCatalogo(x, "tecnicaConservacionZoo"))
          });
        }
        break;
      case this.constantes.arte:
        tipo = 10  
        piezaDetalle.piezaartedetalle = this.detalle
        if (this.materialesArteSelecionados.length > 0) {
          catalogosDetalle = [];
          this.materialesArteSelecionados.forEach(x => {
            catalogosDetalle.push(new DetalleCatalogo(x, "materialesArte"))
          });
        }
        break;
      default:
        break;
    }
    let estadosBien = null;
    if (this.estadosBienSelecionados.length > 0) {
      estadosBien = [];
      this.estadosBienSelecionados.forEach(x => {
        estadosBien.push(new EstadoBien(x))
      });
    }
    this._itemService.guardarPiezaMuseableDetalle(tipo, piezaDetalle, this.documento, estadosBien, catalogosDetalle)
      .subscribe((piezas: any) => {
        this.enviadorCondicion.emit(true);


      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Items.' }),
        () => {
        });

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
}
