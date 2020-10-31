import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import {RegisterBrandResponse} from "./register.brand.service";


export class UpdateCategoryService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {

    try{

      const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
      if(request.token == user.token){

        const searchedCategory = await this._unitOfWork.categoryRepository.findCategory(request.reference);

        if (searchedCategory != undefined){
          searchedCategory.name = request.name;
          this._unitOfWork.start();
          const savedCategory = await this._unitOfWork.complete(async () => await this._unitOfWork.categoryRepository.save(searchedCategory));
          if(savedCategory != undefined){
            return new UpdateCategoryResponse('Categoria actualizada correctamente');
          }
          else{
            return new UpdateCategoryResponse('Esta categoria no se encuentra registrado');
          }
        }
      }
      return new RegisterBrandResponse('Hay un error al validar el usuario');
    }catch (e) {
      return new UpdateCategoryResponse('Se ha presentado un error al momento de actualizar esta categoria');
    }
  }
}

export class UpdateCategoryRequest{
  constructor(
      public userIdentification: string,
      public token: string,
      public reference: string,
      public name: string
  ) {}
}

export class UpdateCategoryResponse{
  constructor(
    public message: string
  ) {}
}