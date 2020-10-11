import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Brand} from "../domain/entity/brand.entity";
import {BrandOrm} from "../infrastructure/database/entity/brand.orm";

export class RegisterBrandService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterBrandRequest): Promise<RegisterBrandResponse>{
        let newBrand: Brand;
        const searchedBrand = await this._unitOfWork.brandRepository.findOne({where: {reference: request.reference}});
        if(searchedBrand == undefined){
            newBrand = new Brand();
            newBrand.reference = request.reference;
            newBrand.name = request.name;
            this._unitOfWork.start();
            const savedBrand = await this._unitOfWork.complete(async () => await this._unitOfWork.brandRepository.save(newBrand));
            if(savedBrand != undefined){
                return new RegisterBrandResponse('Marca registrada con exito');
            }
            return new RegisterBrandResponse('Ha habido un error al momento de registrar esta marca')
        }
        return new RegisterBrandResponse('Esta marca ya se encuentra registrada')
    }

}

export class RegisterBrandRequest{
    constructor(public reference: string, public name: string) {}
}

export class RegisterBrandResponse{
    constructor(public message: string) {}
}