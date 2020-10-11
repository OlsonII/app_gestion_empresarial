import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Category } from '../domain/entity/category.entity';

export class SearchCategoryService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchCategoryRequest): Promise<SearchCategoryResponse>{
    if(request.reference == undefined){
      const categories: Category[] = [];
      const searchedCategories = await this._unitOfWork.categoryRepository.find();
      searchedCategories.forEach(category => {
        categories.push(new Category().mappedOrmToEntity(category));
      });
      return new SearchCategoryResponse(categories);
    }else{
      const searchedCategory = await this._unitOfWork.categoryRepository.findOne({where: {reference: request.reference}});
      return new SearchCategoryResponse(null, new Category().mappedOrmToEntity(searchedCategory));
    }
  }
}

export class SearchCategoryRequest{
  constructor(public readonly reference?: string) {}
}

export class SearchCategoryResponse{
  constructor(public readonly categories?: Category[], public readonly category?: Category) {}
}