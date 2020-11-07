import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { JwtAuthService } from './auth/jwt-auth.service';
import { SearchMovementsResponse} from '../models/responses.model';


@Injectable({
  providedIn: 'root'
})
export class MovementService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl =  baseUrl;
  }

  get(): Observable<SearchMovementsResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<SearchMovementsResponse>(this.baseUrl+'/product/find/transactions',
      {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<SearchMovementsResponse>('Consulta movimiento',null))
    );
  }

}

