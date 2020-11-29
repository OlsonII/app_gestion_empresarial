import { IPerson } from './person.interface';
import { IProduct } from './product.interface';

export interface ISale {
  date: string;
  seller: IPerson;
  client: IPerson;
  products: IProduct[];
  value: number;
  state: string;
}