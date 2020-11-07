import { Component, OnInit } from '@angular/core';
import {Provider} from '../../../../models/provider.model';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProviderService} from '../../../../services/provider.service';

@Component({
  selector: 'app-modify-provider',
  templateUrl: './modify-provider.component.html',
  styleUrls: ['./modify-provider.component.scss']
})
export class ModifyProviderComponent implements OnInit {

  provider: Provider;
  providers: Provider[];
  staticAlertClosed=false;


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private providerService:ProviderService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.provider = new Provider();
    this.getProvider();
  }

  getProvider(){
    this.provider.identification = this.route.snapshot.paramMap.get('id').toString();
    this.providerService.get().subscribe(res=>{

      res.providers.forEach(prod => {
        if(prod.identification === this.provider.identification){
          this.provider = prod;
        }
      });
    });
  }

  modifyProvider(){
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

}
