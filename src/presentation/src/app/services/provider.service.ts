import {Inject, Injectable} from '@angular/core';
import {Provider} from '../Models/provider.model';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { ProviderList } from '../Models/ObjetoLista';
import { JwtAuthService } from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl =  baseUrl;
  }

  get(): Observable<ProviderList>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<ProviderList>(this.baseUrl+'/provider',
    {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<ProviderList>('Consulta marca',null))
    );
  }

  post(provider:Provider): Observable<Provider>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    provider.userIdentification = user;
    provider.token = token;

    return this.http.post<Provider>(this.baseUrl+'/provider',provider).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Provider>('Registrar marca',null))
    );
  }
  put(provider: Provider): Observable<any> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    provider.userIdentification = user;
    provider.token = token;

    return this.http.put<Provider>(this.baseUrl+'/provider',provider).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Provider>('Modificar marca',null))
    );
  }
}

