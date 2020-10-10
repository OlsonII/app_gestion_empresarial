import { Product } from '../domain/entity/product.entity';
import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';


export class SearchProductService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProductRequest): Promise<SearchProductResponse>{
    if(request.reference == undefined){
      const searchedProducts = await this._unitOfWork.productRepository.find();
      return new SearchProductResponse(searchedProducts);
    }else{
      const searchedProducts = await this._unitOfWork.productRepository.findOne(request.reference);
      return new SearchProductResponse(null, searchedProducts);
    }
  }
}

export class SearchProductRequest{
  constructor(public readonly reference?: string) {}
}

export class SearchProductResponse{
  constructor(public readonly products?: Product[], public readonly product?: Product) {}
}