import {IProduct} from "../contracts/product.interface";
import {Brand} from "./brand.entity";
import {Category} from "./category.entity";
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