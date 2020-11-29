import {Inject, Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {Sale} from '../models/sale.model';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { DefaultResponse} from '../models/responses.model';
import {catchError} from 'rxjs/operators';
import {JwtAuthService} from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl = baseUrl;
  }


  post(sale:Sale): Observable<DefaultResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    const newSale = new SaleRegisterRequest(sale,user,token);
    console.log(JSON.stringify(newSale));
    return this.http.post<DefaultResponse>(this.baseUrl+'/sale',newSale).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Registrar Venta',null))
    );
  }

}


export class SaleRegisterRequest{

  public userIdentification: string;
  public token: string;
  public clientIdentification: string;
  public products: Product[];

  constructor(sale:Sale,user:string,token:string){
    this.userIdentification = user;
    this.token = token;
    this.clientIdentification = sale.clientIdentification;
    this.products = sale.products;
  }
}

