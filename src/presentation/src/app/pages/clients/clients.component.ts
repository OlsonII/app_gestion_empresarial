import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  client:Client;
  form: FormGroup;
  submitted = false;
  searchValue:string;
  constructor(
    private toastr:ToastrService,
    private clientService:ClientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.client = new Client();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      telephone: ['', Validators.required],
      street: ['', Validators.required],
      email: ['', Validators.required],
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
    const formData = this.form.value;
    this.client.name = formData.name;
    this.client.identification = formData.identification;
    this.client.email = formData.email;
    this.client.street = formData.street;
    this.client.telephone = formData.telephone;
    this.clientService.post(this.client).subscribe(p => {
      if (p != null) {
        this.showNotification('Registro',p.message,'bottom','right');
      }
    });
  }

}
