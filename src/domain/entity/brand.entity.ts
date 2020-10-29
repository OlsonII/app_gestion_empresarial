import {IBrand} from "../contracts/brand.interface";
import {ObjectID} from "typeorm";

export class Brand implements IBrand{

    public _id: ObjectID;
    public reference: string;
    public name: string;

}