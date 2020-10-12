import {Product} from "./product.entity";
import {ObjectID} from "typeorm";

export class ProductTransaction{

    private _id: ObjectID;
    public inputQuantity: number;
    public outputQuantity: number;
    public product: Product;
    public date: string;

}