import { UserOrm } from './user.orm';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('FINANCIAL_MOVEMENTS')
export class FinancialMovementOrm{
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  date: string;
  @Column()
  entry: number;
  @Column()
  reason: string;
  @Column()
  spending: number;
  @Column()
  user: UserOrm;
}