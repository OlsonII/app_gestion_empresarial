import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Category } from '../domain/entity/category.entity';

export class SearchCategoryService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchCategoryRequest): Promise<SearchCategoryResponse>{
    if(request.reference == undefined){
      const searchedCategories = await this._unitOfWork.categoryRepository.find();
      return new SearchCategoryResponse(searchedCategories);
    }else{
      const searchedCategory = await this._unitOfWork.categoryRepository.findOne(request.reference);
      return new SearchCategoryResponse(null, searchedCategory);
    }
  }
}

export class SearchCategoryRequest{
  constructor(public readonly reference?: string) {}
}

export class SearchCategoryResponse{
  constructor(public readonly categories?: Category[], public readonly category?: Category) {}
}