import {ProviderOrm} from "../../infrastructure/database/entity/provider.orm";
import {Provider} from "../entity/provider.entity";

export class ProviderFactory{

    create(orm?: ProviderOrm): Provider{
        const provider = new Provider();
        if(orm != undefined){
            provider._id = orm._id;
            provider.identification = orm.identification;
            provider.name = orm.name;
            provider.street = orm.street;
            provider.company = orm.company;
            provider.telephone = orm.telephone;
            provider.email = orm.email;
        }
        return provider;
    }
}