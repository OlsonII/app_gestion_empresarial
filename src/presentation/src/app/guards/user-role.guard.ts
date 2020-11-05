import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.jwtAuth.getUser();
    const rol = this.jwtAuth.getRole();
    if (
      user &&
      route.data &&
      route.data.role &&
      route.data.role.includes(rol)
    ) {
      return true;
    } else {
      console.log('no tienes acceso a esta pagina');
      return false;
    }
  }
}
