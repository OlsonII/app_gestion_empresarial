import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Provider} from '../../models/provider.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  provider: Provider;
  searchValue:string;
  staticAlertClosed=false;
  form: FormGroup;
  submitted = false;

  constructor(
    private toastr: ToastrService,
    private providerService:ProviderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.provider = new Provider();
    this.form = this.formBuilder.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      company: ['', Validators.required],
      email: [''],
      address: [''],
    });
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

  add() {
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
    this.providerService.post(this.provider).subscribe(p => {
      if (p != null) {
        this.showNotification('Agregado', p.message,'bottom','right');
      }else{
       console.log(p);
      }
    });
  }

}
