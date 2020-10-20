import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {ClientOrm} from "../database/entity/client.orm";

@Injectable()
@EntityRepository(ClientOrm)
export class ClientRepository extends GenericRepository<ClientOrm>{}