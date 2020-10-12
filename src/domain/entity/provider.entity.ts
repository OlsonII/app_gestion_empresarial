import {IProvider} from "../contracts/provider.interface";
import {CategoryOrm} from "../../infrastructure/database/entity/category.orm";
import {ProviderOrm} from "../../infrastructure/database/entity/provider.orm";
import {ObjectID} from "typeorm";

export class Provider implements IProvider{

    public _id: ObjectID;
    public company: string;
    public email: string;
    public identification: string;
    public name: string;
    public street: string;
    public telephone: string;

    mappedOrmToEntity(orm: ProviderOrm): Provider{
        const provider = new Provider();
        provider._id = orm._id;
        provider.identification = orm.identification;
        provider.name = orm.name;
        provider.street = orm.street;
        provider.company = orm.company;
        provider.telephone = orm.telephone;
        provider.email = orm.email;
        return provider;
    }
}