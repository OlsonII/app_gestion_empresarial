import {Brand} from "../entity/brand.entity";
import {BrandOrm} from "../../infrastructure/database/entity/brand.orm";

export class BrandFactory{

    create(orm?: BrandOrm): Brand {
        const brand = new Brand();
        if(orm != undefined){
            brand._id = orm._id;
            brand.reference = orm.reference;
            brand.name = orm.name;
        }
        return brand;
    }

}