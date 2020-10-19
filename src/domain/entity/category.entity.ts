import {ICategory} from "../contracts/category.interface";
import {ProductOrm} from "../../infrastructure/database/entity/product.orm";
import {CategoryOrm} from "../../infrastructure/database/entity/category.orm";
import {ObjectID} from "typeorm";

export class Category implements ICategory{
    public _id: ObjectID;
    public name: string;
    public reference: string;
}