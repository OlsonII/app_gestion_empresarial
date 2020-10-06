import {IBrand} from "../contracts/brand.entity";

export class Brand implements IBrand{
    reference: string;
    name: string;
}