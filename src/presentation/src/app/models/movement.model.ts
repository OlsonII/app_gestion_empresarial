import {Product} from './product.model';
import { User } from './user.model';

export class Movement{
  reference:string;
  date:string;
  description:string;
  outputQuantity:string;
  inputQuantity:string;
  quantity:string;
  type:string;
  product:Product;
  name:string;
  user:User;

}
