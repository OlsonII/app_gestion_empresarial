import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Brand} from "../domain/entity/brand.entity";
import {Category} from "../domain/entity/category.entity";

export class RegisterCategoryService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterCategoryRequest): Promise<RegisterCategoryResponse>{
        let newCategory: Category;
        const searchedCategory = await this._unitOfWork.categoryRepository.findOne(request.reference);
        if(searchedCategory == undefined){
            newCategory = new Category();
            newCategory = request;
            this._unitOfWork.start();
            const savedCategory = await this._unitOfWork.complete(async () => await this._unitOfWork.categoryRepository.save(newCategory));
            if(savedCategory != undefined){
                return new RegisterCategoryResponse('Categoria registrada con exito');
            }
            return new RegisterCategoryResponse('Ha habido un error al momento de registrar esta categoria')
        }
        return new RegisterCategoryResponse('Esta categoria ya se encuentra registrada')
    }

}

export class RegisterCategoryRequest{
    constructor(public reference: string, public name: string) {}
}

export class RegisterCategoryResponse{
    constructor(public message: string) {}
}