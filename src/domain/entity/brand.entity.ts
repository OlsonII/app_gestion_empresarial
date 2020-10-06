import {IBrand} from "../contracts/brand.interface";

export class Brand implements IBrand{
    reference: string;
    name: string;
}