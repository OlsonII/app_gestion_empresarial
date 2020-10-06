import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {BrandOrm} from "../database/entity/brand.orm";
import {GenericRepository} from "../base/generic.repository";


@Injectable()
@EntityRepository(BrandOrm)
export class BrandRepository extends GenericRepository<BrandOrm>{}