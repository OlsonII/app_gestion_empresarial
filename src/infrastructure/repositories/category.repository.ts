import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {CategoryOrm} from "../database/entity/category.orm";
import {Category} from "../../domain/entity/category.entity";

@Injectable()
@EntityRepository(CategoryOrm)
export class CategoryRepository extends GenericRepository<CategoryOrm>{

    mappedOrmToCategory(orm: CategoryOrm): Category {
        const category = new Category();
        category._id = orm._id;
        category.reference = orm.reference;
        category.name = orm.name;
        return category;
    }

    async findCategory(reference: string): Promise<Category>{
        const orm = await this.findOne({where: {reference: reference}});
        return orm == undefined ? undefined : this.mappedOrmToCategory(orm);
    }

    async findAllCategories(): Promise<Category[]>{
        const categories: Category[] = [];
        const searchedCategories = await this.find();
        searchedCategories.forEach(orm => categories.push(orm));
        return categories;
    }
}