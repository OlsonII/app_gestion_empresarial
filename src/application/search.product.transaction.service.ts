import {ProductTransaction} from "../domain/entity/product.transaction.entity";
import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";

export class SearchProductTransactionService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchProductTransactionRequest): Promise<SearchProductTransactionResponse> {

        try {

            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){
                return new SearchProductTransactionResponse(await this._unitOfWork.productTransactionRepository.findAllProductTransactions());
            }
            return new SearchProductTransactionResponse(undefined,'Hay un error al validar el usuario');

        }catch (e) {
            return new SearchProductTransactionResponse(undefined, 'Ha habido un error al momento de realizar esta consulta');
        }

    }

}

export class SearchProductTransactionRequest{
    constructor(
        public readonly userIdentification: string,
        public readonly token: string
    ) {}
}

export class SearchProductTransactionResponse{
    constructor(public readonly movements: ProductTransaction[], public readonly message?: string) {}
}