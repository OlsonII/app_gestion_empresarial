import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { Provider } from '../domain/entity/provider.entity';

export class SearchProviderService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: SearchProviderRequest): Promise<SearchProviderResponse>{
    if (request.reference == undefined){
      const searchedProvider = await this._unitOfWork.providerRepository.find();
      return new SearchProviderResponse(searchedProvider);
    }else{
      const searchedProviders = await  this._unitOfWork.providerRepository.findOne(request.reference);
      return new SearchProviderResponse(null, searchedProviders);
    }
  }
}

export class SearchProviderRequest{
  constructor(public readonly reference?: string) {}
}

export class SearchProviderResponse{
  constructor(public readonly providers?: Provider[], public readonly provider?: Provider) {}
}