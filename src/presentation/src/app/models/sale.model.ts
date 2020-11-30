import { Product } from "./product.model";

export class Sale{
  public clientIdentification: string;
  public products: Product[];
  public value: number;
  public state: string;

}
