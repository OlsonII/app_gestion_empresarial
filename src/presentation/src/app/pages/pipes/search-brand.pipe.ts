import { Pipe, PipeTransform } from '@angular/core';
import {Brand} from "../../models/brand.model";

@Pipe({
  name: 'searchBrand'
})
export class SearchBrandPipe implements PipeTransform {

  transform(brands:Brand[],searchValue: string ): Brand[] {
    if(!brands || !searchValue){
      return brands;
    }

    return brands.filter((brand)=>{
      if(brand.name!=null){
        return brand.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        brand.reference.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      } else if(brand.reference!=null){
        return brand.reference.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }else{
        return false;
      }
    });
  }

}
