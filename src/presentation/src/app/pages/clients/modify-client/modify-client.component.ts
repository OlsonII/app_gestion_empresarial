import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {JwtAuthService} from '../../../services/auth/jwt-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrls: ['./modify-client.component.scss']
})
export class ModifyClientComponent implements OnInit {

  client:Client;
  isNotAdmin=true;
  form: FormGroup;
  submitted = false;
  searchValue:string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastr:ToastrService,
    private clientService:ClientService,
    private authService:JwtAuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      telephone: ['', Validators.required],
      street: ['', Validators.required],
      email: ['', Validators.required],
    });



    this.client = new Client();
    this.getClient();
    this.getRole();
  }

  get f() { return this.form.controls; }

  showNotification(titulo, mensaje,from, align){
    this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>'+mensaje, titulo, {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
      positionClass: 'toast-' + from + '-' +  align
    });

  }


  getClient(){
    this.form.controls.identification.setValue(this.route.snapshot.paramMap.get('id').toString());
    this.clientService.get().subscribe(res=>{
      res.clients.forEach(client => {
        if(client.identification === this.form.value.identification){
          this.form.controls.name.setValue(client.name);
          this.form.controls.telephone.setValue(client.telephone);
          this.form.controls.street.setValue(client.street);
          this.form.controls.email.setValue(client.email);

          if(this.isNotAdmin){
            this.form.controls.name.disable();
            this.form.controls.identification.disable();
          }
        }
      });
    }
    );


  }

  UpdateClient(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    this.client.name = formData.name;
    this.client.identification = formData.identification;
    this.client.email = formData.email;
    this.client.street = formData.street;
    this.client.telephone = formData.telephone;
    this.clientService.put(this.client).subscribe(res=>{
      this.showNotification('Modificación', res.message,'bottom', 'right');
      this.location.back();
    });
  }

  getRole(){
    const role = this.authService.getRole();
    if(role == 'Administrador'){
      this.isNotAdmin = false;
    }else{
      this.isNotAdmin = true;
    }
  }


}
