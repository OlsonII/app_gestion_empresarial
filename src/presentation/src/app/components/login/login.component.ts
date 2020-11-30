/* tslint:disable:triple-equals */
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {JwtAuthService} from '../../services/auth/jwt-auth.service';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  form: FormGroup;
  submitted = false;
  returnUrl: string;
  errorMsg = '';
  private _unsubscribeAll: Subject<any>;
  staticAlertClosed=false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jwtAuth: JwtAuthService,
    private toastr: ToastrService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(params => this.returnUrl = params.return || '/');
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const signinData = this.form.value
    this.jwtAuth.signin(signinData.username, signinData.password)
      .subscribe(response => {
        if (response.user != null ){
          this.jwtAuth.setUserAndToken(response.user,response.user.rol);
          if(response.user.rol == 'Vendedor'){
            this.router.navigateByUrl('/sales');
          }
          else{
            this.router.navigateByUrl('/products');
          }
        }
        else{
          this.showNotification('Error', 'Usuario o contraseña incorrecta' ,'top', 'center')
        }
      }, err => {
        this.errorMsg = err.message;
        console.log(this.errorMsg);
        this.showNotification('Error',  this.errorMsg,'top', 'right')

      })
  }

  showNotification(titulo, mensaje,from, align){
    this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>'+mensaje, titulo, {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-warning alert-with-icon',
      positionClass: 'toast-' + from + '-' +  align
    });

  }


}
