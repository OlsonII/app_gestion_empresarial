import {Inject, Injectable} from '@angular/core';
import {ProductInput,ProductOutput} from '../models/product-in-out.model';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { RegisterInputOutputResponse} from '../models/responses.model';
import { JwtAuthService } from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsInOutService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl = baseUrl;
  }

  postInput(productInput:ProductInput): Observable<RegisterInputOutputResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    productInput.token = token;
    productInput.userIdentification = user;

    console.log(productInput);
    return this.http.post<RegisterInputOutputResponse>(this.baseUrl+'/product/input',productInput).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<RegisterInputOutputResponse>('Registrar ingreso de producto',null))
    );
  }

  postOutput(productOutput:ProductOutput): Observable<RegisterInputOutputResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    productOutput.token = token;
    productOutput.userIdentification = user;

    return this.http.post<RegisterInputOutputResponse>(this.baseUrl+'/product/output',productOutput).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<RegisterInputOutputResponse>('Registrar salida producto',null))
    );
  }


}
