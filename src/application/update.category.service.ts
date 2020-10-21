import { CategoryFactory } from '../domain/factory/category.factory';
import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';


export class UpdateCategoryService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {

    try{
      const searchedCategory = new CategoryFactory().create(await this._unitOfWork.categoryRepository.findOne({where:{reference:request.reference}}));

      if (searchedCategory != undefined){
        searchedCategory.name = request.name;
        const savedCategory = await this._unitOfWork.complete(async () => await this._unitOfWork.categoryRepository.save(searchedCategory));
        if(savedCategory != undefined){
          return new UpdateCategoryResponse('Categoria actualizada correctamente');
        }
        else{
          return new UpdateCategoryResponse('Esta categoria no se encuentra registrado');
        }
      }
    }catch (e) {
      return new UpdateCategoryResponse('Se ha presentado un error al momento de actualizar esta categoria');
    }
  }
}

export class UpdateCategoryRequest{
  constructor(
      public reference: string,
      public name: string
  ) {
  }
}

export class UpdateCategoryResponse{
  constructor(
    public message: string
  ) {}
}