import {ICategory} from "../contracts/category.interface";

export class Category implements ICategory{
    public name: string;
    public reference: string;
}