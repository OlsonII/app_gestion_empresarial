import {CategoryOrm} from "../../infrastructure/database/entity/category.orm";
import {Category} from "../entity/category.entity";

export class CategoryFactory{

    create(orm?: CategoryOrm): Category {
        const category = new Category();
        if(orm != undefined){
            category._id = orm._id;
            category.reference = orm.reference;
            category.name = orm.name;
        }
        return category;
    }

}