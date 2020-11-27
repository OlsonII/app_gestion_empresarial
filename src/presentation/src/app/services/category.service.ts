import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { SearchCategoryResponse, DefaultResponse } from '../models/responses.model';
import { Category} from '../models/category.model';
import { JwtAuthService } from './auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpErrorService: HandleHttpErrorService,
    private loginService: JwtAuthService
  ) {
    this.baseUrl =  baseUrl;
  }

  get(): Observable<SearchCategoryResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<SearchCategoryResponse>(this.baseUrl+'/category',
    {headers:{['authorization']:auth}}).pipe(
      catchError(this.handleHttpErrorService.handleError<SearchCategoryResponse>('Consulta categoria',null))
    );
  }

  post(category:Category): Observable<DefaultResponse>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    category.userIdentification = user;
    category.token = token;

    return this.http.post<DefaultResponse>(this.baseUrl+'/category',category).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Registrar categoria',null))
    );
  }
  put(category: Category): Observable<DefaultResponse> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    category.userIdentification = user;
    category.token = token;

    return this.http.put<DefaultResponse>(this.baseUrl+'/category',category).pipe(
      catchError(this.handleHttpErrorService.handleError<DefaultResponse>('Modificar categoria',null))
    );
  }
}

export class RegisterCategoryResponse{
  constructor(public readonly message: string) {}
}

export class CategoryInterface{
  name: string;
  reference: string;

  constructor(category:Category){
    this.name=category.name;
    this.reference=category.reference;

  }
}
