import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { FinancialMovement } from '../domain/entity/financial.movement.entity';

export class RegisterFinancialMovementService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterFinancialMovementRequest): Promise<RegisterFinancialMovementResponse>{
    try {
      const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
      if(request.userToken == user.token){
        const financialMovement = new FinancialMovement();
        financialMovement.date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
        financialMovement.entry = request.entry;
        financialMovement.reason = request.reason;
        financialMovement.spending = request.spending;
        financialMovement.user = user;
        this._unitOfWork.start();
        await this._unitOfWork.complete(async () => this._unitOfWork.financialMovementRepository.save(financialMovement));
        return new RegisterFinancialMovementResponse('200', 'Movimiento registrado con exito');
      }
      return new RegisterFinancialMovementResponse('100','Hay un error al validar el usuario');
    }catch (e) {
      return new RegisterFinancialMovementResponse('100', 'Hubo un error al momento de registrar esta transaccion');
    }
  }

}

export class RegisterFinancialMovementRequest{
  constructor(
    public entry: number,
    public reason: string,
    public spending: number,
    public userIdentification: string,
    public userToken: string
  ) {}
}

export class RegisterFinancialMovementResponse{
  constructor(public readonly code: string, public readonly message: string) {}
}