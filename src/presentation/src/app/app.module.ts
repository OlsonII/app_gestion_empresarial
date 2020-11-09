import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { ProviderService} from './services/provider.service';
import {JwtAuthService} from './services/auth/jwt-auth.service';
import {UserRoleGuard} from './guards/user-role.guard';
import {AuthGuard} from './guards/auth.guard';
import {environment} from "../environments/environment";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [ProviderService,JwtAuthService,AuthGuard,UserRoleGuard,{provide:'BASE_URL',useValue:environment.BASE_URL}],
  bootstrap: [AppComponent]
})
export class AppModule {}
