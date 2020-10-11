import { Product } from '../domain/entity/product.entity';
import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import {SearchBrandRequest, SearchBrandService} from "./search.brand.service";


export class SearchProductService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProductRequest): Promise<SearchProductResponse>{
    if(request.reference == undefined){
      const productsList: Product[] = []
      const searchedProducts = await this._unitOfWork.productRepository.find();
      searchedProducts.forEach(productOrm => {
        productsList.push(new Product().mappedOrmToEntity(productOrm));
      });
      return new SearchProductResponse(productsList);
    }else{
      const searchedProduct = await this._unitOfWork.productRepository.findOne({where: {reference: request.reference}});
      return new SearchProductResponse(null, new Product().mappedOrmToEntity(searchedProduct));
    }
  }
}

export class SearchProductRequest{
  constructor(public readonly reference?: string) {}
}

export class SearchProductResponse{
  constructor(public readonly products?: Product[], public readonly product?: Product) {}
}