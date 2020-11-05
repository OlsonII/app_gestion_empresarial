import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleHttpErrorService} from './@base/handle-http-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { CategoryList } from '../Models/ObjetoLista';
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

  get(): Observable<CategoryList>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();

    const auth = user + ' '+token;
    return this.http.get<CategoryList>(this.baseUrl+'/category',
    {headers:{['authorization']:auth}}).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<CategoryList>('Consulta marca',null))
    );
  }

  post(category:Category): Observable<Category>{

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    category.userIdentification = user;
    category.token = token;

    return this.http.post<Category>(this.baseUrl+'/category',category).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Category>('Registrar marca',null))
    );
  }
  put(category: Category): Observable<any> {

    const user =this.loginService.getUser();
    const token = this.loginService.getJwtToken();
    category.userIdentification = user;
    category.token = token;

    return this.http.put<Category>(this.baseUrl+'/category',category).pipe(
      tap(_=>this.handleHttpErrorService.log('datos enviados')),
      catchError(this.handleHttpErrorService.handleError<Category>('Modificar marca',null))
    );
  }
}
export class CategoryInterface{
  name: string;
  reference: string;

  constructor(category:Category){
    this.name=category.name;
    this.reference=category.reference;

  }
}
