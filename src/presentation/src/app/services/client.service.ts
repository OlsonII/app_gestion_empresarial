import {Inject, Injectable} from '@angular/core';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ClientList} from '../models/ObjetoLista';
import {Client} from '../models/client.model';
import { JwtAuthService } from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl =  baseUrl;
  }

  get(): Observable<ClientList>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<ClientList>(this.baseUrl+'/client',
    {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<ClientList>('Consulta cliente',null))
    );
  }

  post(client:Client): Observable<Client>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    client.userIdentification = user;
    client.token = token;

    return this.http.post<Client>(this.baseUrl+'/client',client).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Client>('Registrar cliente',null))
    );
  }
  put(client: Client): Observable<any> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    client.userIdentification = user;
    client.token = token;

    return this.http.put<Client>(this.baseUrl+'/client',client).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Client>('Modificar cliente',null))
    );
  }
}

