import {Inject, Injectable} from '@angular/core';
import {User} from '../Models/user.model';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { SearchUserResponse, DefaultResponse } from '../models/responses.model';
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

  get(): Observable<SearchUserResponse>{

    const userId =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = userId + ' '+token;
    return this.http.get<SearchUserResponse>(this.baseUrl+'/user',
    {headers:{['authorization']:auth}}).pipe(
      catchError(this.handleHttpErrorService.handleError<SearchUserResponse>('Consulta usuario',null))
    );
  }

  post(user:User): Observable<DefaultResponse>{

    const userId =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    user.userIdentification = userId;
    user.token = token;

    return this.http.post<DefaultResponse>(this.baseUrl+'/user',user).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Registrar usuario',null))
    );
  }
  put(user: User): Observable<DefaultResponse> {

    const userId =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    user.userIdentification = userId;
    user.token = token;

    return this.http.put<DefaultResponse>(this.baseUrl+'/user',user).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Modificar usuario',null))
    );
  }
}

