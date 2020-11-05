import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../../models/user.model";

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users:User[],searchValue: string ): User[] {
    if(!users || !searchValue){
      return users;
    }

    return users.filter((user)=>{
      if(user.name!=null){
        return user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        user.identification.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      } else if(user.identification!=null){
        return user.identification.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }else{
        return false;
      }
    });
  }

}
