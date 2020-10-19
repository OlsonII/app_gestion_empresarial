import {IBrand} from "./brand.interface";
import {ICategory} from "./category.interface";
import {IProvider} from "./provider.interface";

export interface IProduct{

    reference: string;
    name: string;
    description?: string;
    brand: IBrand;
    quantity?: number;
    price?: number;
    cost?: number;
    category: ICategory;
}