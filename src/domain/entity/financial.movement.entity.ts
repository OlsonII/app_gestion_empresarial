import { IFinancialMovement } from '../contracts/financial.movement.interface';
import { User } from './user';

export class FinancialMovement implements IFinancialMovement{
  date: string;
  entry: number;
  reason: string;
  spending: number;
  user: User;
}