import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {
  roles: string[] = ['Administrador','Encargado de inventario','Vendedor'];
  user: User;
  staticAlertClosed=false;
  form: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private userService:UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      telephone: ['', Validators.required],
      street: ['', Validators.required],
      rol: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.user = new User();
    this.getUser();
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

  getUser(){
    this.form.controls.identification.setValue(this.route.snapshot.paramMap.get('id').toString());
    this.userService.get().subscribe(res=>{

      res.users.forEach(user => {
        if(user.identification === this.form.value.identification){
           this.form.controls.name.setValue(user.name);
           this.form.controls.identification.setValue(user.identification);
           this.form.controls.telephone.setValue(user.telephone);
           this.form.controls.street.setValue(user.street);
           this.form.controls.rol.setValue(user.rol);
           this.form.controls.password.setValue(user.password);
        }
      });
    }
    );
  }

  updateUser(){
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
    this.userService.put(this.user).subscribe(res=>{
      this.showNotification('Modificación', res.message,'bottom', 'right');
      this.location.back();
    })

  }

}
