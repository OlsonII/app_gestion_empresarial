import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {ProductOrm} from "../database/entity/product.orm";

@Injectable()
@EntityRepository(ProductOrm)
export class ProductRepository extends GenericRepository<ProductOrm>{}