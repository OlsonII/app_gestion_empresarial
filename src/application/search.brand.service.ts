import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Brand} from "../domain/entity/brand.entity";
import {Category} from "../domain/entity/category.entity";

export class SearchBrandService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchBrandRequest): Promise<SearchBrandResponse>{
        
        try {
            if(request.reference == undefined){
                const brands: Brand[] = [];
                const searchedBrands = await this._unitOfWork.brandRepository.find();
                searchedBrands.forEach(brand => {
                    brands.push(new Brand().mappedOrmToEntity(brand));
                });
                return new SearchBrandResponse(brands);
            }else{
                const searchedBrand = await this._unitOfWork.brandRepository.findOne({where: {reference: request.reference}});
                if(searchedBrand == undefined){
                    return new SearchBrandResponse(null,null,'Esta marca no existe')
                }
                return new SearchBrandResponse(null, new Brand().mappedOrmToEntity(searchedBrand));
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