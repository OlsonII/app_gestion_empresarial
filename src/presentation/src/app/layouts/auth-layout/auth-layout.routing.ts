import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapComponent } from '../../pages/map/map.component';
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
import {Routes} from '@angular/router';

export const AuthLayoutRoutes: Routes = [
  { path: 'products', component:ConsultarProductoComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'user', component: UserComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'addProduct', component:RegistrarProductoComponent},
  { path: 'providers', component:ProvidersComponent},
  { path: 'productInOut', component:ProductsInAndOutComponent},
  { path: 'brands', component: MarcasComponent},
  { path: 'categories',component:CategoriesComponent},
  { path: 'modifyProduct/:id',component:ModifyProductComponent},
  { path: 'modifyProvider/:id',component:ModifyProviderComponent},
  { path: 'clients',component:ClientsComponent},
  { path: 'productDetail/:id',component:ProductDetailComponent},
  // { path: "rtl", component: RtlComponent }*/
];
