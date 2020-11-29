import { ISale } from '../contracts/sale.interface';
import { Product } from './product.entity';
import { Client } from './client.entity';
import { User } from './user.entity';

export class Sale implements ISale{

  public client: Client;
  public date: string;
  public products: Product[];
  public seller: User;
  public value: number;
  public state: string;

  returnSale(){
    this.state = 'Devuelta';
  }
  
  completeSale(){
    this.state = 'Completada'
  }
  
  cancelSale(){
    this.state = 'Cancelada';
  }
  
  calculateTotal(){
    this.value = 0;
    this.products.forEach((p)=>{
      this.value += (p.price * p.quantity);
    });
  }

}