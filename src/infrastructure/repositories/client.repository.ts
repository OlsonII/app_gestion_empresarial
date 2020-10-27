import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {ClientOrm} from "../database/entity/client.orm";
import {Client} from "../../domain/entity/client.entity";

@Injectable()
@EntityRepository(ClientOrm)
export class ClientRepository extends GenericRepository<ClientOrm>{

    mappedOrmToClient(orm: ClientOrm): Client{
        const client = new Client();
        client._id = orm._id;
        client.identification = orm.identification;
        client.name = orm.name;
        client.street = orm.street;
        client.telephone = orm.telephone;
        client.email = orm.email;
        return client;
    }

    async findClient(identification: string): Promise<Client>{
        const orm = await this.findOne({where: {identification: identification}});
        return orm == undefined ? undefined : this.mappedOrmToClient(orm);
    }

    async findAllClients(): Promise<Client[]>{
        const clients: Client[] = [];
        const searchedClients = await this.find();
        searchedClients.forEach(orm => clients.push(this.mappedOrmToClient(orm)));
        return clients;
    }

}