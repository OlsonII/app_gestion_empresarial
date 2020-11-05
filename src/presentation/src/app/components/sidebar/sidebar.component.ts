import { Component, OnInit } from '@angular/core';
import {JwtAuthService} from '../../services/auth/jwt-auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/products',
    title: 'Productos',
    icon: 'icon-app',
    class: ''
  },
  {
    path: '/providers',
    title: 'Proveedores',
    icon: 'icon-bus-front-12',
    class: ''
  },
  {
    path: '/categories',
    title: 'Categorias',
    icon: 'icon-bullet-list-67',
    class: ''
  },
  {
    path: '/brands',
    title: 'Marcas',
    icon: 'icon-tag',
    class: ''
  },
  {
    path: '/user',
    title: 'Usuarios',
    icon: 'tim-icons  icon-single-02',
    class: ''
  },
  {
    path: '/clients',
    title: 'Clientes',
    icon: 'tim-icons  icon-single-02',
    class: '',
  },
  {
    path: '/movements',
    title: 'Movimientos',
    icon: 'tim-icons icon-notes',
    class: ''
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[]=[];

  constructor(private auth:JwtAuthService) {}

  ngOnInit() {
    const role = this.auth.getRole();
    if ( role != null){
      if (role === 'Encargado de inventario'){
        for (const item of ROUTES) {
          if(item.title !== 'Usuarios'&& item.title !== 'Proveedores' && item.title !== 'Clientes' && item.title !== 'Movimientos'){
            this.menuItems.push(item)
          }
        }
      }else{
        this.menuItems = ROUTES;
      }
    }
  }
}
