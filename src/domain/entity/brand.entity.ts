import {IBrand} from "../contracts/brand.interface";
import {CategoryOrm} from "../../infrastructure/database/entity/category.orm";
import {BrandOrm} from "../../infrastructure/database/entity/brand.orm";
import {ObjectID} from "typeorm";

export class Brand implements IBrand{
    public _id: ObjectID;
    public reference: string;
    public name: string;

    mappedOrmToEntity(orm: BrandOrm): Brand{
        const brand = new Brand();
        brand._id = orm._id;
        brand.reference = orm.reference;
        brand.name = orm.name;
        return brand;
    }

}