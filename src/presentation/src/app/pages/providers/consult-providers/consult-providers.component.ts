import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../models/provider.model';
import { ProviderService } from '../../../services/provider.service';
import {ExportToExcelService} from '../../../services/exportToexcel.service';

@Component({
  selector: 'app-consult-providers',
  templateUrl: './consult-providers.component.html',
  styleUrls: ['./consult-providers.component.scss']
})
export class ConsultProvidersComponent implements OnInit {

  provider: Provider;
  searchValue:string;
  providers: Provider[];

  constructor(
    private providerService:ProviderService,
    private exportService: ExportToExcelService
  ) { }

  ngOnInit(): void {
    this.provider = new Provider();
    this.getProviders();
  }

  exportToExcel(){
    this.exportService.exportProviders(this.providers,"Proveedores");
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
}
