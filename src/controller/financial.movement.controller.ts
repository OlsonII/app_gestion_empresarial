import { Controller, Post } from '@nestjs/common';
import { UnitOfWork } from '../infrastructure/unitOfWork/unitOfWork';
import {
  RegisterFinancialMovementRequest,
  RegisterFinancialMovementService,
} from '../application/register.financial.movement.service';


@Controller('financialMovements')
export class FinancialMovementController {

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerMovement(request: RegisterFinancialMovementRequest){
    const service: RegisterFinancialMovementService = new RegisterFinancialMovementService(this._unitOfWork);
    return await service.execute(request);
  }

}