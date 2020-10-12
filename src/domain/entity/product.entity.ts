import {IProduct} from "../contracts/product.interface";
import {IBrand} from "../contracts/brand.interface";
import {ICategory} from "../contracts/category.interface";
import {IProvider} from "../contracts/provider.interface";
import {ProductOrm} from "../../infrastructure/database/entity/product.orm";
import {Brand} from "./brand.entity";
import {Category} from "./category.entity";
import {Provider} from "./provider.entity";
import {ObjectID} from "typeorm";

export class Product implements IProduct{
    public _id: ObjectID;
    public brand: Brand;
    public category: Category;
    public cost: number;
    public description: string;
    public name: string;
    public price: number;
    public provider: Provider;
    public quantity: number;
    public reference: string;

    insertProduct(quantity: number){
        this.quantity += quantity;
    }

    removeProduct(quantity: number){
        this.quantity -= quantity;
    }

    calculateTotalCost(){
        return this.quantity * this.cost;
    }

    calculateTotalPrice(){
        return this.quantity * this.price;
    }

    mappedOrmToEntity(orm: ProductOrm): Product{
        const product = new Product();
        product._id = orm._id;
        product.reference = orm.reference;
        product.name = orm.name;
        product.description = orm.description;
        product.provider = new Provider().mappedOrmToEntity(orm.provider);
        product.brand = new Brand().mappedOrmToEntity(orm.brand);
        product.category = new Category().mappedOrmToEntity(orm.category);
        product.cost = orm.cost;
        product.price = orm.price;
        product.quantity = orm.quantity;
        return product;
    }
}