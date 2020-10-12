import {Product} from "../domain/entity/product.entity";
import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {RegisterProductResponse} from "./register.product.service";
import {ProductTransaction} from "../domain/entity/product.transaction.entity";
import {ProductOrm} from "../infrastructure/database/entity/product.orm";

export class RegisterProductInputService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProductInputRequest): Promise<RegisterProductInputResponse>{
        const transaction: ProductTransaction = new ProductTransaction();
        transaction.inputQuantity = request.inputQuantity;
        transaction.outputQuantity = 0;
        transaction.product = new Product().mappedOrmToEntity(await this._unitOfWork.productRepository.findOne({where: {reference: request.productReference}}));
        transaction.product.insertProduct(request.inputQuantity);
        transaction.date = request.date;
        this._unitOfWork.start();
        const savedProduct = await this._unitOfWork.productRepository.save(transaction.product);
        const savedTransaction = await this._unitOfWork.productTransactionRepository.save(request);
        if(savedTransaction != undefined){
            return new RegisterProductInputResponse('Transaccion registrada con exito', savedProduct.quantity);
        }
        return new RegisterProductInputResponse('Ha habido un error al momento de registrar esta transaccion')
    }

}

export class RegisterProductInputRequest{

    constructor(
        public inputQuantity: number,
        public outputQuantity: number,
        public productReference: string,
        public date: string
    ) { }

}

export class RegisterProductInputResponse{
    constructor(public readonly message: string, public readonly newQuantity?: number) {}
}