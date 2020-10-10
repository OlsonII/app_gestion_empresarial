import {IProduct} from "../contracts/product.interface";
import {IBrand} from "../contracts/brand.interface";
import {ICategory} from "../contracts/category.interface";
import {IProvider} from "../contracts/provider.interface";

export class Product implements IProduct{
    public brand: IBrand;
    public category: ICategory;
    public cost?: number;
    public description?: string;
    public name: string;
    public price?: number;
    public provider: IProvider;
    public quantity?: number;
    public reference: string;
}