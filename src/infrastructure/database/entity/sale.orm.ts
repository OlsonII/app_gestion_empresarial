import { ClientOrm } from './client.orm';
import { ProductOrm } from './product.orm';
import { ProviderOrm } from './provider.orm';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('SALES')
export class SaleOrm{
  @ObjectIdColumn()
  public _id: ObjectID;
  @Column()
  public client: ClientOrm;
  @Column()
  public code: number;
  @Column()
  public date: string;
  @Column()
  public products: ProductOrm[];
  @Column()
  public seller: ProviderOrm;
  @Column()
  public value: number;
  @Column()
  public state: string;
}