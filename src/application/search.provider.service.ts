import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Provider } from '../domain/entity/provider.entity';
import { SearchBrandResponse } from './search.brand.service';
import {ProviderFactory} from "../domain/factory/provider.factory";

export class SearchProviderService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProviderRequest): Promise<SearchProviderResponse>{
    try {
      if (request.identification == undefined){
        const providers: Provider[] = [];
        const searchedProviders = await this._unitOfWork.providerRepository.find();
        searchedProviders.forEach(provider => {
          providers.push(new ProviderFactory().create(provider));
        })
        return new SearchProviderResponse(providers, null);
      }else{
        const searchedProvider = await  this._unitOfWork.providerRepository.findOne({where: {identification: request.identification}});
        if(searchedProvider == undefined){
          return new SearchProviderResponse(null,null,'Este proveedor no existe')
        }
        return new SearchProviderResponse(null, new ProviderFactory().create(searchedProvider));
      }
    }catch (e) {
      return new SearchProviderResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
    }

  }
}

export class SearchProviderRequest{
  constructor(public readonly identification?: string) {}
}

export class SearchProviderResponse{
  constructor(public readonly providers?: Provider[], public readonly provider?: Provider, public readonly message?: string) {}
}