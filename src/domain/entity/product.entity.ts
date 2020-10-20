import {IProduct} from "../contracts/product.interface";
import {IBrand} from "../contracts/brand.interface";
import {ICategory} from "../contracts/category.interface";
import {IPerson} from "../contracts/provider.interface";
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
}