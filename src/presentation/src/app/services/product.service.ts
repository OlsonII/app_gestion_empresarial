import {Inject, Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { SearchProductResponse, DefaultResponse} from '../models/responses.model';
import {catchError, tap} from 'rxjs/operators';
import {JwtAuthService} from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl = baseUrl;
  }

  get(): Observable<SearchProductResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;

    return this.http.get<SearchProductResponse>(this.baseUrl+'/product',
    {headers:{['authorization']:auth}}).pipe(
      catchError(this.handleHttpErrorService.handleError<SearchProductResponse>('Consulta productos',null))
    );
  }

  post(Prod:Product): Observable<DefaultResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    const producto = new ProductInterface(Prod,user,token);

    return this.http.post<DefaultResponse>(this.baseUrl+'/product',producto).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Registrar productos',null))
    );
  }

  put (Prod: Product): Observable<DefaultResponse> {
    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    const producto = new ProductInterfaceUpdate(Prod,user,token);

    return this.http.put<DefaultResponse>(this.baseUrl+'/product',producto).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Producto modificado',null))
    );
  }


}

export class ProductInterfaceUpdate{
  productReference:string;
  categoryReference:string;
  cost:number;
  description:string;
  price:number;
  token:string;
  userIdentification:string;

  constructor(producto:Product, user:string, token:string){
    this.productReference = producto.reference;
    this.categoryReference = producto.category.reference;
    this.cost = producto.cost;
    this.description = producto.description;
    this.price = producto.price;
    this.userIdentification = user;
    this.token = token;
  }
}

export class ProductInterface{
  reference:string;
  brandReference:string;
  categoryReference:string;
  name:string;
  providerIdentification:string;
  cost:number;
  description:string;
  quantity:number;
  price:number;
  token:string;
  userIdentification:string;

  constructor(producto:Product, user:string, token:string){
    this.reference = producto.reference;
    this.brandReference = producto.brand.reference;
    this.categoryReference = producto.category.reference;
    this.name = producto.name;
    this.cost = producto.cost;
    this.description = producto.description;
    this.quantity = producto.quantity;
    this.price = producto.price;
    this.userIdentification = user;
    this.token = token;
  }
}
