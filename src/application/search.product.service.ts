import { Product } from '../domain/entity/product.entity';
import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import {RegisterBrandResponse} from "./register.brand.service";


export class SearchProductService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProductRequest): Promise<SearchProductResponse>{
    try {

      const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
      if(request.token == user.token){

        if(request.reference == undefined){
          return new SearchProductResponse(await this._unitOfWork.productRepository.findAllProducts());
        }else{
          const searchedProduct = await this._unitOfWork.productRepository.findProduct(request.reference);
          if(searchedProduct == undefined){
            return new SearchProductResponse(null,null,'Este producto no existe')
          }
          return new SearchProductResponse(null, searchedProduct);
        }

      }
      return new RegisterBrandResponse('Hay un error al validar el usuario');
    }catch (e) {
      return new SearchProductResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
    }

  }
}

export class SearchProductRequest{
  constructor(
      public userIdentification: string,
      public token: string,
      public readonly reference?: string) {}
}

export class SearchProductResponse{
  constructor(public readonly products?: Product[], public readonly product?: Product, public readonly message?: string) {}
}