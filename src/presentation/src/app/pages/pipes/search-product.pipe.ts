import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../../models/product.model";

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(products:Product[],searchValue: string ): Product[] {
    if(!products || !searchValue){
      return products;
    }

    return products.filter((product)=>{
      if(product.name!=null){
        return product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        product.reference.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      } else{
        return false;
      }
    });
  }

}
