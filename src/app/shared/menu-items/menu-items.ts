import {Injectable} from '@angular/core';
import { Properties } from '../../pages/properties';
import * as CryptoJS from 'crypto-js';
import { Constantes } from '../../pages/constantes';
export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MenuAdmin= {
  label: 'Navegación',
  main: [
    
    {
      state: 'administracion',
      short_label: 'B',
      name: 'Administración',
      type: 'sub',
      icon: 'ti-layout-grid2-alt',
      children: [
        {
          state: 'catalogos',
          name: 'Catálogos'
        },
        {
          state: 'usuarios',
          name: 'Usuarios'
        },
        {
          state: 'museo',
          name: 'Museos'
        },
        {
          state: 'eliminacion',
          name: 'Eliminación'
        }

      ]
    },
    {
      state: 'item',
      short_label: 'B',
      name: 'Items',
      type: 'sub',
      icon: 'ti-layout-grid2-alt',
      children: [
        {
          state: 'item',
          name: 'Item'
        },
        {
          state: 'movimientos',
          name: 'Movimientos'
        }
      ]
    }
  ],
}

const MenuCustodio={
  label: 'Item',
  main: [
    
    {
      state: 'item',
      short_label: 'B',
      name: 'Items',
      type: 'sub',
      icon: 'ti-layout-grid2-alt',
      children: [
        {
          state: 'item',
          name: 'Item'
        },
        {
          state: 'movimientos',
          name: 'Movimientos'
        }
      ]
    },
  ],
}






@Injectable()
export class MenuItems {
   properties = new Properties();
   constantes= new Constantes();
  getAll(): Menu[] {
    let MENUITEMS=[]
    if (localStorage.getItem("sesion") != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("sesion"), this.properties.key);
      let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
     
      let roles= persona.usuario.roles 
      if(roles ){
        let admin = roles.find(x=>x.rolid==this.constantes.rolAdministrador)
        if(admin  ||persona.usuario.username=="admin"){
          MENUITEMS.push(MenuAdmin)
        }else {
          MENUITEMS.push(MenuCustodio)
        }
      }
     
      
    }
    return MENUITEMS;
  }
}
