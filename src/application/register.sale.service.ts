import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { IPerson } from '../domain/contracts/person.interface';
import { IProduct } from '../domain/contracts/product.interface';
import { Sale } from '../domain/entity/sale.entity';
import { RegisterProductOutputRequest, RegisterProductOutputService } from './register.product.output.service';
import {
  RegisterFinancialMovementRequest,
  RegisterFinancialMovementService,
} from './register.financial.movement.service';
import { Product } from '../domain/entity/product.entity';

export class RegisterSaleService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterSaleRequest): Promise<RegisterSaleResponse>{

    try {
      const user =  await this._unitOfWork.userRepository.findUser(request.userIdentification);
      if(request.token == user.token){
        const sale = new Sale();
        sale.date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
        sale.products = request.products;
        sale.seller = user;
        sale.client = await this._unitOfWork.clientRepository.findClient(request.clientIdentification);
        sale.calculateTotal();
        await this.registerProductsMovements(sale.products, request);
        await this.registerFinancialMovement(request, sale.value);
        sale.completeSale();
        this._unitOfWork.start();
        const registeredSale = await this._unitOfWork.complete(async () => await this._unitOfWork.saleRepository.save(sale));
        if(registeredSale != undefined)
          return new RegisterSaleResponse('200', 'Venta registrada con exito', registeredSale.value);
      }
      return new RegisterSaleResponse('100','Hay un error al validar el usuario', 0);
    }catch (e) {
      if(e == 'No hay stock de algunos productos, por favor verificar')
        return new RegisterSaleResponse('100', e, 0);

      return new RegisterSaleResponse('100', 'Hubo un error al momento de registrar esta venta', 0);
    }

  }

  private async registerProductsMovements(products: IProduct[], request){
    for (const p of products) {
      const service = new RegisterProductOutputService(this._unitOfWork);
      const response = await service.execute(
        new RegisterProductOutputRequest(
          false,
          request.userIdentification,
          request.token,
          p.quantity,
          p.reference,
          'Venta de producto'
        )
      );
      if(response.message === 'No hay stock disponible'){
        throw new Error('No hay stock de algunos productos, por favor verificar')
      }
    }
  }

  private async registerFinancialMovement(request, value){
    await new RegisterFinancialMovementService(this._unitOfWork)
      .execute(new RegisterFinancialMovementRequest(
        value,
        'Venta de productos',
        0,
        request.userIdentification,
        request.token
      ));
  }

}

export class RegisterSaleRequest{
  constructor(
    public userIdentification: string,
    public token: string,
    public clientIdentification: string,
    public products: Product[]
  ) {}
}

export class RegisterSaleResponse{
  constructor(public readonly code: string, public readonly message: string, public readonly value: number) {}
}