import {Inject, Injectable} from '@angular/core';
import {User} from '../Models/user.model';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {UserList } from '../Models/ObjetoLista';
import { JwtAuthService } from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl =  baseUrl;
  }

  get(): Observable<UserList>{

    const userId =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = userId + ' '+token;
    return this.http.get<UserList>(this.baseUrl+'/user',
    {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<UserList>('Consulta usuario',null))
    );
  }

  post(user:User): Observable<User>{

    const userId =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    user.userIdentification = userId;
    user.token = token;

    return this.http.post<User>(this.baseUrl+'/user',user).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<User>('Registrar usuario',null))
    );
  }
  put(user: User): Observable<any> {

    const userId =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    user.userIdentification = userId;
    user.token = token;

    return this.http.put<User>(this.baseUrl+'/user',user).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<User>('Modificar usuario',null))
    );
  }
}

