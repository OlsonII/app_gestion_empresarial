import {IBrand} from "../contracts/brand.interface";

export class Brand implements IBrand{
    public reference: string;
    public name: string;
}