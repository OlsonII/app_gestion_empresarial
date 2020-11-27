import {Inject, Injectable} from '@angular/core';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { SearchClientResponse, DefaultResponse} from '../models/responses.model';
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

  get(): Observable<SearchClientResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<SearchClientResponse>(this.baseUrl+'/client',
    {headers:{['authorization']:auth}}).pipe(
      catchError(this.handleHttpErrorService.handleError<SearchClientResponse>('Consulta cliente',null))
    );
  }

  post(client:Client): Observable<DefaultResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    client.userIdentification = user;
    client.token = token;

    return this.http.post<DefaultResponse>(this.baseUrl+'/client',client).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Registrar cliente',null))
    );
  }
  put(client: Client): Observable<DefaultResponse> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    client.userIdentification = user;
    client.token = token;

    return this.http.put<DefaultResponse>(this.baseUrl+'/client',client).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Modificar cliente',null))
    );
  }
}

