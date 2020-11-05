import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { JwtAuthService } from './auth/jwt-auth.service';
import {MovementList} from '../models/ObjetoLista';


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

  get(): Observable<MovementList>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    // console.log(MovementList);

    const auth = user + ' '+token;
    return this.http.get<MovementList>(this.baseUrl+'/product/find/transactions',
      {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<MovementList>('Consulta movimiento',null))
    );
  }

}

