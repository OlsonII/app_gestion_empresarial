import {IProvider} from "../contracts/provider.interface";
import {ObjectID} from "typeorm";

export class Provider implements IProvider{

    public _id: ObjectID;
    public company: string;
    public email: string;
    public identification: string;
    public name: string;
    public street: string;
    public telephone: string;
}