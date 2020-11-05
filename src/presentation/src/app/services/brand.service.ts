import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Brand} from '../Models/brand.model';
import {BrandList} from '../Models/ObjetoLista';
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

  get(): Observable<BrandList>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<BrandList>(this.baseUrl+'/brand',
    {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<BrandList>('Consulta marca',null))
    );
  }

  post(brand:Brand): Observable<Brand>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    brand.userIdentification = user;
    brand.token = token;

    return this.http.post<Brand>(this.baseUrl+'/brand',brand).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Brand>('Registrar marca',null))
    );
  }
  put(brand: Brand): Observable<any> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    brand.userIdentification = user;
    brand.token = token;

    return this.http.put<Brand>(this.baseUrl+'/brand',brand).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Brand>('Modificar marca',null))
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
