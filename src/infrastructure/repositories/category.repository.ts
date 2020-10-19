import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {CategoryOrm} from "../database/entity/category.orm";

@Injectable()
@EntityRepository(CategoryOrm)
export class CategoryRepository extends GenericRepository<CategoryOrm>{}