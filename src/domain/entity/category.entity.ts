import {ICategory} from "../contracts/category.interface";
import {ProductOrm} from "../../infrastructure/database/entity/product.orm";
import {CategoryOrm} from "../../infrastructure/database/entity/category.orm";

export class Category implements ICategory{
    public name: string;
    public reference: string;

    mappedOrmToEntity(orm: CategoryOrm): Category{
        const category = new Category();
        category.reference = orm.reference;
        category.name = orm.name;
        return category;
    }

}