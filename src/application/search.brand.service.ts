import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Brand} from "../domain/entity/brand.entity";

export class SearchBrandService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchBrandRequest): Promise<SearchBrandResponse>{
        
        try {
            if(request.reference == undefined){
                return new SearchBrandResponse(await this._unitOfWork.brandRepository.findAllBrands());
            }else{
                const searchedBrand = await this._unitOfWork.brandRepository.findBrand(request.reference);
                if(searchedBrand == undefined){
                    return new SearchBrandResponse(null,null,'Esta marca no existe')
                }
                return new SearchBrandResponse(null, searchedBrand);
            }
        }catch (e) {
            return new SearchBrandResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
        }

    }

}

export class SearchBrandRequest{
    constructor(public readonly reference?: string) {}
}

export class SearchBrandResponse{
    constructor(public readonly brands?: Brand[], public readonly brand?: Brand, public readonly message?: string) {}
}