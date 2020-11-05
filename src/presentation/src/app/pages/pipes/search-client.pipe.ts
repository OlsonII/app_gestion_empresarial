import { Pipe, PipeTransform } from '@angular/core';
import {Client} from "../../models/client.model";

@Pipe({
  name: 'searchClient'
})
export class SearchClientPipe implements PipeTransform {

  transform(clients:Client[],searchValue: string ): Client[] {
    if(!clients || !searchValue){
      return clients;
    }

    return clients.filter((client)=>{
      if(client.name!=null){
        return client.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        client.identification.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      } else if(client.identification!=null){
        return client.identification.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }else{
        return false;
      }
    });
  }

}
