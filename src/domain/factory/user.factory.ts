import {UserOrm} from "../../infrastructure/database/entity/user.orm";
import {User} from "../entity/user";


export class UserFactory{

    create(orm?: UserOrm): User{
        const user = new User();
        if(orm != undefined){
            user._id = orm._id;
            user.identification = orm.identification;
            user.name = orm.name;
            user.street = orm.street;
            user.telephone = orm.telephone;
            user.email = orm.email;
            user.rol = orm.rol;
            user.password = orm.password;
        }
        return user;
    }

}