import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {JwtAuthService} from '../../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrls: ['./modify-client.component.scss']
})
export class ModifyClientComponent implements OnInit {

  client:Client;
  isNotAdmin=true;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private toastr:ToastrService,
    private clientService:ClientService,
    private authService:JwtAuthService
  ) { }

  ngOnInit(): void {
    this.client = new Client();
    this.getClient();
    this.getRole();
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


  getClient(){
    this.client.identification = this.route.snapshot.paramMap.get('id').toString();
    this.clientService.get().subscribe(res=>{

      res.clients.forEach(client => {
        if(client.identification === this.client.identification){
          this.client = client;
        }
      });
    }
    );


  }

  UpdateClient(){
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
