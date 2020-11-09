import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserComponent } from '../../pages/user/user.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { RegistrarProductoComponent } from '../../pages/products/registrar-producto/registrar-producto.component';
import { ConsultarProductoComponent } from '../../pages/products/consultar-producto/consultar-producto.component';
import {CategoriesComponent} from '../../pages/categories/categories.component'
import { SearchProductPipe } from '../../pages/pipes/search-product.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProvidersComponent} from '../../pages/providers/providers.component';
import {ProductsInAndOutComponent} from '../../pages/products/products-in-and-out/products-in-and-out.component';
import {MarcasComponent} from '../../pages/marcas/marcas.component';
import {ModifyProductComponent} from '../../pages/products/modify-product/modify-product.component';
import {ModifyProviderComponent} from '../../pages/providers/modify-providers/modify-provider/modify-provider.component';
import {ClientsComponent} from '../../pages/clients/clients.component';
import {ProductDetailComponent} from '../../pages/products/product-detail/product-detail.component';
import { ModifyUserComponent } from '../../pages/user/modify-user/modify-user.component';
import { ModifyClientComponent } from '../../pages/clients/modify-client/modify-client.component';
import { SearchClientPipe} from '../../pages/pipes/search-client.pipe';
import { SearchProviderPipe} from '../../pages/pipes/search-provider.pipe';
import { SearchCategoryPipe} from '../../pages/pipes/search-category.pipe';
import { SearchUserPipe} from '../../pages/pipes/search-user.pipe';
import { SearchBrandPipe} from '../../pages/pipes/search-brand.pipe';
import { ModalsComponent } from '../../pages/modals/modals.component';
import { MovementComponent } from '../../pages/movement/movement.component';
import { ModalCategoryComponent } from '../../pages/modal-category/modal-category.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    RegistrarProductoComponent,
    ConsultarProductoComponent,
    CategoriesComponent,
    SearchProductPipe,
    ProvidersComponent,
    ProductsInAndOutComponent,
    MarcasComponent,
    ModifyProductComponent,
    ModifyProviderComponent,
    ClientsComponent,
    ProductDetailComponent,
    ModifyUserComponent,
    ModifyClientComponent,
    SearchClientPipe,
    SearchProviderPipe,
    SearchCategoryPipe,
    SearchUserPipe,
    SearchBrandPipe,
    ModalsComponent,
    MovementComponent,
    ModalCategoryComponent
  ]
})
export class AdminLayoutModule {}
