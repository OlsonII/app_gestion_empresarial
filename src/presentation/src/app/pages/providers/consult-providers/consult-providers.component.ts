import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../models/provider.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../../../services/provider.service';

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
    private toastr: ToastrService,
    private providerService:ProviderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.provider = new Provider();
    this.getProviders();
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
