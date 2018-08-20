import { Component, OnInit } from '@angular/core';
import { Properties } from '../../properties'
import { CatalogoService } from '../../../services/catalogos/catalogos.service'
import { UsuarioService } from '../../../services/usuarios/usuarios.service'
import { SelectItem } from 'primeng/primeng';
import { Message, ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.html'
  //,styleUrls: ['./with-bg-image.component.css']
})
export class UsuarioComponent implements OnInit {
  title = "Usuarios"
  titleAsignar = 'Asignar Roles a Usuario'
  properties = new Properties();
  msgs: Message[] = [];
  acciones = this.properties.labelLista + this.title;
  roles = [];
  bandera = 0;
  rolSeleccionado = null;
  permisos = []
  permisosSelecionado = [];
  usuarios = [];
  rolItem = []
  rolesEditar = []
  asignar = false

  msgsRol: Message[] = [];
  usuarioSeleccionado = null;
  constructor(private _catalogoService: CatalogoService,
    private confirmationService: ConfirmationService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.cargarRoles();
    this.cargarPermisos();
  }



  cargarRoles() {
    this._usuarioService.optenerRoles()
      .subscribe((roles: any[]) => {
        this.roles = roles;
        this.rolItem = []
        roles.forEach(x => {
          if (x.rolid != 1 && x.rolid != 5) {
            this.rolItem.push(x)
          }
        });
        this.cargarUsuarios()
      }, (err: any) => console.log(err),
        () => {
        });
  }

  // 

  modificarRoles(usuario) {
    this.usuarioSeleccionado = usuario
    this.rolesEditar = []
    usuario.roles.forEach(element => {
      this.rolesEditar.push(element.rolId)
      this.rolesEditar = this.rolesEditar.slice()
    });
    this.asignar = true
  }

  cancelar() {
    this.cargarUsuarios()
    this.asignar = false
  }

  asignarRoles() {
    let rolAsignar = []
    let usuarioAlmacenar = this.usuarioSeleccionado
    usuarioAlmacenar.roles = null
    this.rolesEditar.forEach(element => {
      rolAsignar.push({ rolId: element, usrId: usuarioAlmacenar})
    })
    this._usuarioService.asignarRoles(rolAsignar, this.usuarioSeleccionado.id)
      .subscribe(() => {
          this.cargarUsuarios()
          this.asignar = false

         
      }, (err: any) => {
        console.log(err);
      }, () => { })
  }

  cargarUsuarios() {
    this.usuarios = []
    this._usuarioService.optenerUsuarios()
      .subscribe((usuarios: any[]) => {
        this.usuarios = usuarios   
      
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
    this.permisosSelecionado = rol.permisoSet;
    this.rolSeleccionado = rol
    this.bandera = 1;
  }

  guardar() {
    this.msgsRol = [];

    this.rolSeleccionado.permisoSet = this.permisosSelecionado;
    this._usuarioService.actualizarRol(this.rolSeleccionado)
      .subscribe((rol: any) => {
        this.rolSeleccionado = rol;
        this.bandera = 0;
        this.msgsRol.push({ severity: 'success', summary: 'Éxito', detail: 'Permisos Actualizados.' });
      }, (err: any) => this.msgsRol.push({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar los permisos' }),
        () => {
        });
  }

  actualizarRol(event, usuario) {
    usuario.rolId = event;
    this.usuarioSeleccionado = usuario;


    this.confirmationService.confirm({
      key: "confirmar",
      message: "¿Está seguro de asignar el ROL <strong> " + event.nombre + " </strong> al usuario <strong> " + usuario.nombres + " </strong>?",
      header: this.properties.titutloPreguntaConfirmacion,
      icon: this.properties.iconAdvertencia,
    });
  }

  actualizarUsuarioRol() {
    this.msgs = [];

    this._usuarioService.actualizarUsuario(this.usuarioSeleccionado)
      .subscribe((rol: any) => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Rol Asignado' });
      }, (err: any) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo asignar el Rol' }),
        () => {
        });
  }
}
