import { User } from '../entity/user';

export interface IFinancialMovement{
  date: string;
  user: User;
  reason: string;
  entry: number;
  spending: number;
}