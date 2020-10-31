import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Category} from "../domain/entity/category.entity";
import {RegisterBrandResponse} from "./register.brand.service";

export class RegisterCategoryService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterCategoryRequest): Promise<RegisterCategoryResponse>{

        try{

            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){

                let newCategory: Category;
                const searchedCategory = await this._unitOfWork.categoryRepository.findCategory(request.reference);
                if(searchedCategory == undefined){
                    newCategory = new Category();
                    newCategory.reference = request.reference;
                    newCategory.name = request.name;
                    this._unitOfWork.start();
                    const savedCategory = await this._unitOfWork.complete(async () => await this._unitOfWork.categoryRepository.save(newCategory));
                    if(savedCategory != undefined){
                        return new RegisterCategoryResponse('Categoria registrada con exito');
                    }
                }
                return new RegisterCategoryResponse('Esta categoria ya se encuentra registrada');

            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e){
            return new RegisterCategoryResponse('Ha habido un error al momento de registrar esta categoria');
        }

    }

}

export class RegisterCategoryRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public reference: string,
        public name: string) {}
}

export class RegisterCategoryResponse{
    constructor(public message: string) {}
}