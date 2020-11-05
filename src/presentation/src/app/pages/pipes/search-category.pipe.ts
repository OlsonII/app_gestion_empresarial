import { Pipe, PipeTransform } from '@angular/core';
import {Category} from "../../models/category.model";

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(categorys:Category[],searchValue: string ): Category[] {
    if(!categorys || !searchValue){
      return categorys;
    }

    return categorys.filter((category)=>{
      if(category.name!=null){
        return category.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        category.reference.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      } else if(category.reference!=null){
        return category.reference.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }else{
        return false;
      }
    });
  }

}
