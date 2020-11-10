import {Inject, Injectable} from '@angular/core';
import {Provider} from '../Models/provider.model';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { SearchProviderResponse, DefaultResponse } from '../models/responses.model';
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

  get(): Observable<SearchProviderResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<SearchProviderResponse>(this.baseUrl+'/provider',
    {headers:{['authorization']:auth}}).pipe(
      catchError(this.handleHttpErrorService.handleError<SearchProviderResponse>('Consulta marca',null))
    );
  }

  post(provider:Provider): Observable<DefaultResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    provider.userIdentification = user;
    provider.token = token;

    return this.http.post<DefaultResponse>(this.baseUrl+'/provider',provider).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Registrar marca',null))
    );
  }
  put(provider: Provider): Observable<DefaultResponse> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    provider.userIdentification = user;
    provider.token = token;

    return this.http.put<DefaultResponse>(this.baseUrl+'/provider',provider).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Modificar marca',null))
    );
  }

}


