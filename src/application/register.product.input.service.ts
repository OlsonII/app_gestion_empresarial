import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {ProductTransaction} from "../domain/entity/product.transaction.entity";

export class RegisterProductInputService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProductInputRequest): Promise<RegisterProductInputResponse>{

        try {
            const transaction: ProductTransaction = new ProductTransaction();
            transaction.inputQuantity = request.inputQuantity;
            transaction.outputQuantity = 0;
            transaction.product = await this._unitOfWork.productRepository.findProduct(request.productReference);
            transaction.product.insertProduct(request.inputQuantity);
            transaction.date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
            this._unitOfWork.start();
            const savedProduct = await this._unitOfWork.complete(async () =>  await this._unitOfWork.productRepository.save(transaction.product));
            this._unitOfWork.start();
            const savedTransaction = await this._unitOfWork.complete(async () =>  await this._unitOfWork.productTransactionRepository.save(transaction));
            if(savedTransaction != undefined){
                return new RegisterProductInputResponse('Transaccion registrada con exito', savedProduct.quantity);
            }
        }catch (e) {
            return new RegisterProductInputResponse('Se ha presentado un error al momento de registrar esta transaccion')
        }
    }

}

export class RegisterProductInputRequest{
    constructor(
        public inputQuantity: number,
        public productReference: string,
        public description: string,
    ) {}
}

export class RegisterProductInputResponse{
    constructor(public readonly message: string, public readonly newQuantity?: number) {}
}