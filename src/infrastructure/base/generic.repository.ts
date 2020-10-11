import {Injectable} from "@nestjs/common";
import {MongoRepository, Repository} from "typeorm";


@Injectable()
export class GenericRepository<T> extends MongoRepository<T>{}
