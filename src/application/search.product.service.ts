import { Product } from '../domain/entity/product.entity';
import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';


export class SearchProductService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProductRequest): Promise<SearchProductResponse>{
    try {
      if(request.reference == undefined){
        return new SearchProductResponse(await this._unitOfWork.productRepository.findAllProducts());
      }else{
        const searchedProduct = await this._unitOfWork.productRepository.findProduct(request.reference);
        if(searchedProduct == undefined){
          return new SearchProductResponse(null,null,'Este producto no existe')
        }
        return new SearchProductResponse(null, searchedProduct);
      }
    }catch (e) {
      return new SearchProductResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
    }

  }
}

export class SearchProductRequest{
  constructor(public readonly reference?: string) {}
}

export class SearchProductResponse{
  constructor(public readonly products?: Product[], public readonly product?: Product, public readonly message?: string) {}
}