import {Injectable} from "@nestjs/common";
import {MongoRepository} from "typeorm";


@Injectable()
export class GenericRepository<T> extends MongoRepository<T>{}
