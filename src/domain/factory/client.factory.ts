import {Provider} from "../entity/provider.entity";
import {ClientOrm} from "../../infrastructure/database/entity/client.orm";
import {Client} from "../entity/client.entity";

export class ClientFactory{

    create(orm?: ClientOrm): Client{
        const client = new Client();
        if(orm != undefined){
            client._id = orm._id;
            client.identification = orm.identification;
            client.name = orm.name;
            client.street = orm.street;
            client.telephone = orm.telephone;
            client.email = orm.email;
        }
        return client;
    }

}