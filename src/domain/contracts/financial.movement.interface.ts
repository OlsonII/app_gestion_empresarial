import { User } from '../entity/user.entity';

export interface IFinancialMovement{
  date: string;
  user: User;
  reason: string;
  entry: number;
  spending: number;
}