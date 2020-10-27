import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Provider } from '../domain/entity/provider.entity';

export class SearchProviderService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProviderRequest): Promise<SearchProviderResponse>{
    try {
      if (request.identification == undefined){
        return new SearchProviderResponse(await this._unitOfWork.providerRepository.findAllProviders(), null);
      }else{
        const searchedProvider = await  this._unitOfWork.providerRepository.findProvider(request.identification);
        if(searchedProvider == undefined){
          return new SearchProviderResponse(null,null,'Este proveedor no existe')
        }
        return new SearchProviderResponse(null, searchedProvider);
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