import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Provider } from '../domain/entity/provider.entity';
import {RegisterBrandResponse} from "./register.brand.service";

export class SearchProviderService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProviderRequest): Promise<SearchProviderResponse>{
    try {

      const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
      if(request.token == user.token){

        if (request.identification == undefined){
          return new SearchProviderResponse(await this._unitOfWork.providerRepository.findAllProviders(), null);
        }else{
          const searchedProvider = await  this._unitOfWork.providerRepository.findProvider(request.identification);
          if(searchedProvider == undefined){
            return new SearchProviderResponse(null,null,'Este proveedor no existe')
          }
          return new SearchProviderResponse(null, searchedProvider);
        }

      }
      return new RegisterBrandResponse('Hay un error al validar el usuario');

    }catch (e) {
      return new SearchProviderResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
    }

  }
}

export class SearchProviderRequest{
  constructor(
      public userIdentification: string,
      public token: string,
      public readonly identification?: string) {}
}

export class SearchProviderResponse{
  constructor(public readonly providers?: Provider[], public readonly provider?: Provider, public readonly message?: string) {}
}