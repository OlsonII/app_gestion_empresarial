import {ProductOrm} from "../../infrastructure/database/entity/product.orm";
import {Product} from "../entity/product.entity";
import {BrandFactory} from "./brand.factory";
import {CategoryFactory} from "./category.factory";

export class ProductFactory{

    create(orm?: ProductOrm): Product {
        const product = new Product();
        if(orm != undefined){
            product._id = orm._id;
            product.reference = orm.reference;
            product.name = orm.name;
            product.description = orm.description;
            product.brand = new BrandFactory().create(orm.brand);
            product.category = new CategoryFactory().create(orm.category);
            product.cost = orm.cost;
            product.price = orm.price;
            product.quantity = orm.quantity;
        }
        return product;
    }
}