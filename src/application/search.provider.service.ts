import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Provider } from '../domain/entity/provider.entity';

export class SearchProviderService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProviderRequest): Promise<SearchProviderResponse>{
    if (request.identification == undefined){
      const searchedProviders = await this._unitOfWork.providerRepository.find();
      return new SearchProviderResponse(searchedProviders, null);
    }else{
      const searchedProvider = await  this._unitOfWork.providerRepository.findOne(request.identification);
      return new SearchProviderResponse(null, searchedProvider);
    }
  }
}

export class SearchProviderRequest{
  constructor(public readonly identification?: string) {}
}

export class SearchProviderResponse{
  constructor(public readonly providers?: Provider[], public readonly provider?: Provider) {}
}