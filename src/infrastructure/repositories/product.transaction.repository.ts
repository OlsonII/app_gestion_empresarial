import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {ProductTransactionOrm} from "../database/entity/product.transaction.orm";

@Injectable()
@EntityRepository(ProductTransactionOrm)
export class ProductTransactionRepository extends GenericRepository<ProductTransactionOrm>{}