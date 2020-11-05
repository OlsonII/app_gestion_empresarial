import { Pipe, PipeTransform } from '@angular/core';
import {Provider} from "../../models/provider.model";

@Pipe({
  name: 'searchProvider'
})
export class SearchProviderPipe implements PipeTransform {

  transform(providers:Provider[],searchValue: string ): Provider[] {
    if(!providers || !searchValue){
      return providers;
    }

    return providers.filter((provider)=>{
      if(provider.name!=null){
        return provider.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        provider.identification.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      } else if(provider.identification!=null){
        return provider.identification.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }else{
        return false;
      }
    });
  }

}
