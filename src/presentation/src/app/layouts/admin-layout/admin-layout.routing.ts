import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserComponent } from '../../pages/user/user.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
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
import {MovementComponent} from "../../pages/movement/movement.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'products', component:ConsultarProductoComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'notifications', component: NotificationsComponent },
  {
    path: 'user',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component: UserComponent
  },
  { path: 'tables', component: TablesComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'products', component:ConsultarProductoComponent},
  { path: 'addProduct', component:RegistrarProductoComponent},
  {
    path: 'providers',
    canActivate:[UserRoleGuard],
    data:{role: config.authRoles.admin},
    component:ProvidersComponent
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
  // { path: "rtl", component: RtlComponent }
];
