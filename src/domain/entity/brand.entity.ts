import {IBrand} from "../contracts/brand.interface";
import {CategoryOrm} from "../../infrastructure/database/entity/category.orm";
import {BrandOrm} from "../../infrastructure/database/entity/brand.orm";

export class Brand implements IBrand{
    public reference: string;
    public name: string;

    mappedOrmToEntity(orm: BrandOrm): Brand{
        const category = new Brand();
        category.reference = orm.reference;
        category.name = orm.name;
        return category;
    }

}