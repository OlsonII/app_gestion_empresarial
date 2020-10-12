import {ICategory} from "../contracts/category.interface";
import {ProductOrm} from "../../infrastructure/database/entity/product.orm";
import {CategoryOrm} from "../../infrastructure/database/entity/category.orm";
import {ObjectID} from "typeorm";

export class Category implements ICategory{
    public _id: ObjectID;
    public name: string;
    public reference: string;

    mappedOrmToEntity(orm: CategoryOrm): Category{
        const category = new Category();
        category._id = orm._id;
        category.reference = orm.reference;
        category.name = orm.name;
        return category;
    }

}