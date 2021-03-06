import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../services/client.service';
import {ExportToExcelService} from '../../../services/exportToexcel.service';

@Component({
  selector: 'app-consult-client',
  templateUrl: './consult-client.component.html',
  styleUrls: ['./consult-client.component.scss']
})
export class ConsultClientComponent implements OnInit {

  clients:Client[];
  searchValue:string;
  constructor(
    private toastr:ToastrService,
    private clientService:ClientService,
    private exportService:ExportToExcelService
  ) { }

  ngOnInit(): void {
    this.getClients();
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

  exportToExcel(){
    this.exportService.exportClients(this.clients,"Clientes");
  }

  getClients(){
    this.clientService.get().subscribe(
      res=>{
        if(res!=null){
          if(res.clients!=null){
            this.clients = res.clients;
          }else{
            this.showNotification('Consulta',res.message,'bottom','right');
          }

        }
      }
    );
  }


}
