import { Routes } from '@angular/router';

import {UserComponent } from '../../pages/user/user.component';
import {ConsultarProductoComponent} from '../../pages/products/consultar-producto/consultar-producto.component';
import {RegistrarProductoComponent} from '../../pages/products/registrar-producto/registrar-producto.component';
import {ProvidersComponent} from '../../pages/providers/providers.component';
import {ProductsInAndOutComponent} from '../../pages/products/products-in-and-out/products-in-and-out.component'
import {MarcasComponent} from '../../pages/marcas/marcas.component';
import {CategoriesComponent} from '../../pages/categories/categories.component';
import {ModifyProductComponent} from '../../pages/products/modify-product/modify-product.component';
import {ClientsComponent} from '../../pages/clients/clients.component';
import {ModifyProviderComponent} from '../../pages/providers/modify-providers/modify-provider/modify-provider.component';
import {ProductDetailComponent} from '../../pages/products/product-detail/product-detail.component';
import {UserRoleGuard} from '../../guards/user-role.guard';
import {config} from '../../../config';
import {ModifyUserComponent} from '../../pages/user/modify-user/modify-user.component';
import {ModifyClientComponent} from '../../pages/clients/modify-client/modify-client.component';
import {MovementComponent} from '../../pages/movement/movement.component';
import {ConsultProvidersComponent} from '../../pages/providers/consult-providers/consult-providers.component';
import {ConsultClientComponent } from '../../pages/clients/consult-client/consult-client.component';
import {ConsultUserComponent } from '../../pages/user/consult-user/consult-user.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'products', component:ConsultarProductoComponent},
  {
    path: 'user',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component: UserComponent
  },
  {
    path: 'consultUser',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component: ConsultUserComponent
  },
  { path: 'products', component:ConsultarProductoComponent},
  { path: 'addProduct', component:RegistrarProductoComponent},
  {
    path: 'providers',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component:ProvidersComponent
  },
  {
    path: 'consultProviders',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component:ConsultProvidersComponent
  },
  { path: 'productInOut', component:ProductsInAndOutComponent},
  { path: 'brands', component: MarcasComponent},
  { path: 'categories',component:CategoriesComponent},
  { path: 'modifyProduct/:id',component:ModifyProductComponent},
  { path: 'modifyProvider/:id',component:ModifyProviderComponent},
  {
    path: 'clients',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component:ClientsComponent
  },
  {
    path: 'consultClients',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component:ConsultClientComponent
  },
  { path: 'productDetail/:id',component:ProductDetailComponent},
  { path: 'productDetail/:id',component:ProductDetailComponent},
  { path: 'modifyUser/:id',component:ModifyUserComponent},
  { path: 'modifyClient/:id',component:ModifyClientComponent},
  {
    path: 'movements',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component:MovementComponent
  },
];
