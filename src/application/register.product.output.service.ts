import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {ProductTransaction} from "../domain/entity/product.transaction.entity";
import {RegisterBrandResponse} from "./register.brand.service";

export class RegisterProductOutputService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProductOutputRequest): Promise<RegisterProductOutputResponse>{
        
        try{

            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){

                const transaction: ProductTransaction = new ProductTransaction();
                transaction.inputQuantity = 0;
                transaction.outputQuantity = request.outputQuantity;
                transaction.description = request.description;
                transaction.product = await this._unitOfWork.productRepository.findProduct(request.productReference);
                if(transaction.product.quantity < transaction.outputQuantity){
                    transaction.outputQuantity = transaction.product.quantity;
                    transaction.product.quantity = 0;
                }else{
                    transaction.product.removeProduct(request.outputQuantity);
                }
                transaction.date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
                transaction.user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
                this._unitOfWork.start();
                const savedProduct = await this._unitOfWork.complete(async () =>  await this._unitOfWork.productRepository.save(transaction.product));
                this._unitOfWork.start();
                const savedTransaction = await this._unitOfWork.complete(async () =>  await this._unitOfWork.productTransactionRepository.save(transaction));
                if(savedTransaction != undefined){
                    return new RegisterProductOutputResponse('Transaccion registrada con exito', savedProduct.quantity);
                }
            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e) {
            return new RegisterProductOutputResponse('Ha habido un error al momento de registrar esta transaccion', undefined)
        }

    }

}

export class RegisterProductOutputRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public outputQuantity: number,
        public productReference: string,
        public description: string
    ) {}
}

export class RegisterProductOutputResponse{
    constructor(public readonly message: string, public readonly newQuantity?: number) {}
}