import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { ProviderFactory } from '../domain/factory/provider.factory';


export class UpdateProviderService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: UpdateProviderRequest): Promise<UpdateProviderResponse>{
    try{
      const searchedProvider = new ProviderFactory().create(await this._unitOfWork.providerRepository.findOne({where:{identification: request.identification}}));

      if (searchedProvider !=undefined){
        searchedProvider.street = request.street != undefined ? request.street : searchedProvider.street;
        searchedProvider.telephone = request.telephone != undefined ? request.telephone : searchedProvider.telephone;
        searchedProvider.email = request.email != undefined ? request.email : searchedProvider.email;
        searchedProvider.company = request.company != undefined ? request.company : searchedProvider.company;
        const savedProvider = await this._unitOfWork.complete(async ()=> await this._unitOfWork.providerRepository.save(searchedProvider));
        if (savedProvider !=undefined){
          return new UpdateProviderResponse('Proveedor actualizado correctamente');
        }
      }else{
        return new UpdateProviderResponse('Este proveedor no se encuentra registrado');
      }
    }catch (e) {
      return new UpdateProviderResponse('Se ha presentado un error al momento de actualizar este producto');
    }
  }
}

export class UpdateProviderRequest{
  constructor(
    public identification: string,
    public street: string,
    public telephone: string,
    public email: string,
    public company: string
  ) {
  }
}

export class UpdateProviderResponse{
  constructor(
    public message: string
  ) {
  }
}