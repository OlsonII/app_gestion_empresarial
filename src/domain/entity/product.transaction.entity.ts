import {Product} from "./product.entity";
import {ObjectID} from "typeorm";
import {IPerson} from "../contracts/person.interface";

export class ProductTransaction{

    public _id: ObjectID;
    public inputQuantity: number;
    public outputQuantity: number;
    public description: string;
    public product: Product;
    public date: string;
    public user: IPerson;

}