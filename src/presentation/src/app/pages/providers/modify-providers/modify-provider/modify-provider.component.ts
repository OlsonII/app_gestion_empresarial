import { Component, OnInit } from '@angular/core';
import {Provider} from '../../../../models/provider.model';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProviderService} from '../../../../services/provider.service';
import {JwtAuthService} from '../../../../services/auth/jwt-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-provider',
  templateUrl: './modify-provider.component.html',
  styleUrls: ['./modify-provider.component.scss']
})
export class ModifyProviderComponent implements OnInit {

  provider: Provider;
  providers: Provider[];
  staticAlertClosed=false;
  isNotAdmin = true;
  form: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private providerService:ProviderService,
    private location:Location,
    private authService:JwtAuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      company: ['', Validators.required],
      email: [''],
      address: [''],
    });
    this.provider = new Provider();
    this.getRole();
    this.getProvider();
  }

  get f() { return this.form.controls; }

  getProvider(){
    this.form.controls.identification.setValue( this.route.snapshot.paramMap.get('id').toString());
    this.providerService.get().subscribe(res=>{
      res.providers.forEach(prod => {
        if(prod.identification === this.form.value.identification){
          this.form.controls.name.setValue(prod.name);
          this.form.controls.telephone.setValue(prod.telephone);
          this.form.controls.company.setValue(prod.company);
          this.form.controls.email.setValue(prod.email);
          this.form.controls.address.setValue(prod.street);
        }
      });
    });
  }

  modifyProvider(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value
    this.provider.identification = formData.identification;
    this.provider.name = formData.name;
    this.provider.email = formData.email;
    this.provider.company = formData.company;
    this.provider.street = formData.address;
    this.provider.telephone = formData.telephone;
    this.providerService.put(this.provider).subscribe(p => {
      this.showNotification('Modificación', p.message,'bottom', 'right')
      this.location.back();
    });
  }

  showNotification(titulo, mensaje,from, align){
    this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>'+mensaje, titulo, {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
      positionClass: 'toast-' + from + '-' +  align
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
