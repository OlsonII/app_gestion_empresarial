import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {UserOrm} from "../database/entity/user.orm";

@Injectable()
@EntityRepository(UserOrm)
export class UserRepository extends GenericRepository<UserOrm>{}