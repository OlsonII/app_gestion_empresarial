import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Brand} from '../Models/brand.model';
import { SearchBrandResponse, DefaultResponse} from '../models/responses.model';
import { JwtAuthService } from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl =  baseUrl;
  }

  get(): Observable<SearchBrandResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<SearchBrandResponse>(this.baseUrl+'/brand',
    {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<SearchBrandResponse>('Consulta marca',null))
    );
  }

  post(brand:Brand): Observable<DefaultResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    brand.userIdentification = user;
    brand.token = token;

    return this.http.post<DefaultResponse>(this.baseUrl+'/brand',brand).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Registrar marca',null))
    );
  }
  put(brand: Brand): Observable<DefaultResponse> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    brand.userIdentification = user;
    brand.token = token;

    return this.http.put<DefaultResponse>(this.baseUrl+'/brand',brand).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Modificar marca',null))
    );
  }
}

export class BrandInterface{
  name: string;
  reference: string;

  constructor(brand:Brand){
    this.name=brand.name;
    this.reference=brand.reference;

  }
}
