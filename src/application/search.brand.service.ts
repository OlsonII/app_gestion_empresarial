import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Brand} from "../domain/entity/brand.entity";
import {RegisterBrandResponse} from "./register.brand.service";

export class SearchBrandService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchBrandRequest): Promise<SearchBrandResponse>{
        
        try {
            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){

                if(request.reference == undefined){
                    return new SearchBrandResponse(await this._unitOfWork.brandRepository.findAllBrands());
                }else{
                    const searchedBrand = await this._unitOfWork.brandRepository.findBrand(request.reference);
                    if(searchedBrand == undefined){
                        return new SearchBrandResponse(null,null,'Esta marca no existe')
                    }
                    return new SearchBrandResponse(null, searchedBrand);
                }
            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e) {
            return new SearchBrandResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
        }
    }

}

export class SearchBrandRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public readonly reference?: string) {}
}

export class SearchBrandResponse{
    constructor(public readonly brands?: Brand[], public readonly brand?: Brand, public readonly message?: string) {}
}