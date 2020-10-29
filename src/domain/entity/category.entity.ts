import {ICategory} from "../contracts/category.interface";
import {ObjectID} from "typeorm";

export class Category implements ICategory{
    public _id: ObjectID;
    public name: string;
    public reference: string;
}