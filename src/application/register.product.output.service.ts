import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {ProductTransaction} from "../domain/entity/product.transaction.entity";
import {Product} from "../domain/entity/product.entity";
import {RegisterProductResponse} from "./register.product.service";
import {ProductFactory} from "../domain/factory/product.factory";

export class RegisterProductOutputService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProductOutputRequest): Promise<RegisterProductOutputResponse>{
        
        try{
            const transaction: ProductTransaction = new ProductTransaction();
            transaction.inputQuantity = 0;
            transaction.outputQuantity = request.outputQuantity;
            transaction.product = new ProductFactory().create(await this._unitOfWork.productRepository.findOne({where: {reference: request.productReference}}));
            if(transaction.product.quantity < transaction.outputQuantity){
                transaction.outputQuantity = transaction.product.quantity;
                transaction.product.quantity = 0;
            }else{
                transaction.product.removeProduct(request.outputQuantity);
            }
            transaction.date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
            this._unitOfWork.start();
            const savedProduct = await this._unitOfWork.complete(async () =>  await this._unitOfWork.productRepository.save(transaction.product));
            this._unitOfWork.start();
            const savedTransaction = await this._unitOfWork.complete(async () =>  await this._unitOfWork.productTransactionRepository.save(transaction));
            if(savedTransaction != undefined){
                return new RegisterProductOutputResponse('Transaccion registrada con exito', savedProduct.quantity);
            }
        }catch (e) {
            return new RegisterProductOutputResponse('Ha habido un error al momento de registrar esta transaccion', undefined)
        }

    }

}

export class RegisterProductOutputRequest{
    constructor(
        public outputQuantity: number,
        public productReference: string,
        public description: string
    ) {}
}

export class RegisterProductOutputResponse{
    constructor(public readonly message: string, public readonly newQuantity?: number) {}
}