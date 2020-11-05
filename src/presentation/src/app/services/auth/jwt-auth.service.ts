import {Inject, Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, delay, map} from 'rxjs/operators';
import {LocalStoreService} from '../local-store.service';
import {HandleHttpErrorService} from '../@base/handle-http-error.service';
import {Login} from '../../models/login.module';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  token:string;
  isAuthenticated: boolean;
  user: User;
  role;
  user$;
  signingIn: boolean;
  JWT_TOKEN = 'JWT_TOKEN';
  ID_USER = 'ID_USER';
  ROLE_USER = 'ROLE_USER';
  baseUrl: string;
  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService
  ) {
    this.user$ = (new BehaviorSubject<User>(this.user));
    this.baseUrl = baseUrl;
  }

  public signin(username, password): Observable<Login> {
     const identification = username;
     this.signingIn = false;
     return this.http.post<Login>(this.baseUrl+'/login', { identification, password })
       .pipe(
         catchError((error) => {
           return throwError(error);
         })
       );
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    this.setUserAndToken(this.getJwtToken(), this.getRole());
  }

  public signout() {
    this.setUserAndToken(null, null);
    this.router.navigateByUrl('login');
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }

  getUser() {
    return this.ls.getItem(this.ID_USER);
  }

  getRole() {
    return this.ls.getItem(this.ROLE_USER);
  }

  setUserAndToken(user: User,role: string) {
    this.user = user;
    this.role = role;
    let identification = null;
    if(user != null){
      this.token = user.token;
      identification = user.identification;
      this.isAuthenticated = true;
    }
    else{
      this.token = null;
    }
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, this.token);
    this.ls.setItem(this.ID_USER, identification);
    this.ls.setItem(this.ROLE_USER,role);
  }
}
