import {IProvider} from "../contracts/provider.interface";

export class Provider implements IProvider{
    public company: string;
    public email: string;
    public identification: string;
    public name: string;
    public reference: string;
    public street: string;
    public telephone: string;
}