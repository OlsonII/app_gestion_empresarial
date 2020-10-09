import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Provider} from "../domain/entity/provider.entity";

export class RegisterProviderService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProviderRequest): Promise<RegisterProviderResponse>{
        let newProvider: Provider;
        const searchedCategory = await this._unitOfWork.providerRepository.findOne(request.identification);
        if(searchedCategory == undefined){
            newProvider = new Provider();
            newProvider = request;
            this._unitOfWork.start();
            const savedProvider = await this._unitOfWork.complete(async () => await this._unitOfWork.providerRepository.save(newProvider));
            if(savedProvider != undefined){
                return new RegisterProviderResponse('Proveedor registrado con exito');
            }
            return new RegisterProviderResponse('Ha habido un error al momento de registrar este proveedor')
        }
        return new RegisterProviderResponse('Este proveedor ya se encuentra registrado')
    }

}

export class RegisterProviderRequest{
    constructor(
        public company: string,
        public email: string,
        public identification: string,
        public name: string,
        public street: string,
        public telephone: string
    ) {}
}

export class RegisterProviderResponse{
    constructor(public readonly message: string) {}
}