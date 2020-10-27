import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Category } from '../domain/entity/category.entity';

export class SearchCategoryService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchCategoryRequest): Promise<SearchCategoryResponse>{

    try {
      if(request.reference == undefined){
        return new SearchCategoryResponse(await this._unitOfWork.categoryRepository.findAllCategories());
      }else{
        const searchedCategory = await this._unitOfWork.categoryRepository.findCategory(request.reference);
        if(searchedCategory == undefined){
          return new SearchCategoryResponse(null,null,'Esta categoria no existe')
        }
        return new SearchCategoryResponse(null, searchedCategory);
      }
    }catch (e) {
      return new SearchCategoryResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
    }

  }
}

export class SearchCategoryRequest{
  constructor(public readonly reference?: string) {}
}

export class SearchCategoryResponse{
  constructor(public readonly categories?: Category[], public readonly category?: Category, public readonly message?: string) {}
}