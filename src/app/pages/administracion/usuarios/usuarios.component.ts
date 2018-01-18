import { Component, OnInit } from '@angular/core';
import { Properties } from '../../properties'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { UsuarioService } from '../../../services/usuarios/usuarios.service'
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class UsuarioComponent implements OnInit {

  proerties = new Properties();
  title = "Usuarios"
  acciones = this.proerties.labelLista + this.title;
  roles = [];
  bandera = 0;
  rolSeleccionado = null;
  permisos = []
  permisosSelecionado = [];

  constructor(private _catalogoService: CatalogoService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.cargarCatalogos()
    this.cargarRoles();
    this.cargarPermisos();
  }

  cargarCatalogos() {
    this._catalogoService.obtenerCatalogosPadre()
      .subscribe((periodos: any[]) => {

      }, (err: any) => console.log(err),
      () => {
      });
  }

  cargarRoles() {
    this._usuarioService.optenerRoles()
      .subscribe((roles: any[]) => {
        this.roles = roles;
      }, (err: any) => console.log(err),
      () => {
      });
  }

  cargarPermisos() {
    this._usuarioService.optenerPermisos()
      .subscribe((permisos: any[]) => {

        permisos.forEach(x => {
          this.permisos.push({ label: x.nombre, value: x })
        });


      }, (err: any) => console.log(err),
      () => {
      });
  }

  modificarPermisos(rol) {
    this.permisosSelecionado=rol.permisoSet;
    this.rolSeleccionado = rol
    this.bandera = 1;
  }

  guardar() {
    console.log(this.permisosSelecionado);
    this.rolSeleccionado.permisoSet = this.permisosSelecionado;
    this._usuarioService.actualizarRol(this.rolSeleccionado)
      .subscribe((rol: any) => {
        this.rolSeleccionado=rol;
        this.bandera=0;
      }, (err: any) => console.log(err),
      () => {
      });
  }
}
