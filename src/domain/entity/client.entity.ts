import {IPerson} from "../contracts/person.interface";
import {ObjectID} from "typeorm";

export class Client implements IPerson{

    public _id: ObjectID;
    public email: string;
    public identification: string;
    public name: string;
    public street: string;
    public telephone: string;

}