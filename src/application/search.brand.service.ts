import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Brand} from "../domain/entity/brand.entity";

export class SearchBrandService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchBrandRequest): Promise<SearchBrandResponse>{
        if(request.reference == undefined){
            const searchedBrands = await this._unitOfWork.brandRepository.find();
            return new SearchBrandResponse(searchedBrands);
        }else{
            const searchedBrand = await this._unitOfWork.brandRepository.findOne(request.reference);
            return new SearchBrandResponse(null, searchedBrand);
        }
    }

}

export class SearchBrandRequest{
    constructor(public readonly reference?: string) {}
}

export class SearchBrandResponse{
    constructor(public readonly brands?: Brand[], public readonly brand?: Brand) {}
}