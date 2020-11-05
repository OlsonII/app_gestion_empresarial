import { Brand } from './brand.model';
import { Category } from './category.model';

export class Product{
  reference:string;
  brand:Brand;
  category:Category;
  name:string;
  cost:number;
  description:string;
  quantity:number;
  price:number;
  public userIdentification: string;
  public token: string;
}
