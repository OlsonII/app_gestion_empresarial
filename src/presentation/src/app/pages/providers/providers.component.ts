import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Provider} from '../../models/provider.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  provider: Provider;
  searchValue:string;
  providers: Provider[];
  staticAlertClosed=false;
  constructor(private toastr: ToastrService, private providerService:ProviderService) {
  }

  ngOnInit(): void {
    this.provider = new Provider();
    this.getProviders();
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

  getProviders(){
    this.providerService.get().subscribe(
      res=>{
        if(res!=null){
          this.providers = res.providers;
        }
      }
    );
  }

  add() {
    this.providerService.post(this.provider).subscribe(p => {
      if (p != null) {
        this.showNotification('Agregado','Provider agregado','bottom','right');
      }else{
       console.log(p);
      }
      this.getProviders();
    });
  }

}
