import { Controller, Post } from '@nestjs/common';
import { RegisterSaleRequest, RegisterSaleService } from '../application/register.sale.service';
import { UnitOfWork } from '../infrastructure/unitOfWork/unitOfWork';

@Controller('sale')
export class SaleController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerSale(request: RegisterSaleRequest){
    const service: RegisterSaleService = new RegisterSaleService(this._unitOfWork);
    return await service.execute(request);
  }


}