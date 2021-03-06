import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  roles: string[] = ['Administrador','Encargado de inventario','Vendedor'];
  user: User;
  staticAlertClosed=false;
  searchValue:string;
  form: FormGroup;
  submitted = false;

  constructor(private toastr: ToastrService, private userService:UserService, private formBuilder: FormBuilder, private location:Location) {}

  ngOnInit() {
    this.user = new User();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      telephone: ['', Validators.required],
      street: ['', Validators.required],
      rol: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  showNotification(titulo, mensaje,from, align){
    this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>'+mensaje, titulo, {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
      positionClass: 'toast-' + from + '-' +  align
    });

  }
  add() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    this.user.name = formData.name;
    this.user.identification = formData.identification;
    this.user.rol = formData.rol;
    this.user.street = formData.street;
    this.user.telephone = formData.telephone;
    this.user.password = formData.password;
    this.userService.post(this.user).subscribe(p => {
      if (p != null) {
        this.showNotification('Registro',p.message,'bottom','right');
        this.location.back();
      }
    });
  }

}
