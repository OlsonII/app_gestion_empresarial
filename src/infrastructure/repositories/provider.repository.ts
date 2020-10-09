import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {CategoryOrm} from "../database/entity/category.orm";
import {GenericRepository} from "../base/generic.repository";
import {ProviderOrm} from "../database/entity/provider.orm";

@Injectable()
@EntityRepository(ProviderOrm)
export class ProviderRepository extends GenericRepository<ProviderOrm>{}