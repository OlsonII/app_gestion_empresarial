import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import {RegisterBrandResponse} from "./register.brand.service";


export class UpdateProviderService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute(request: UpdateProviderRequest): Promise<UpdateProviderResponse>{
    try{

      const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
      if(request.token == user.token){

        const searchedProvider = await  this._unitOfWork.providerRepository.findProvider(request.identification);

        if (searchedProvider !=undefined){
          searchedProvider.street = request.street != undefined ? request.street : searchedProvider.street;
          searchedProvider.telephone = request.telephone != undefined ? request.telephone : searchedProvider.telephone;
          searchedProvider.email = request.email != undefined ? request.email : searchedProvider.email;
          searchedProvider.company = request.company != undefined ? request.company : searchedProvider.company;
          this._unitOfWork.start();
          const savedProvider = await this._unitOfWork.complete(async ()=> await this._unitOfWork.providerRepository.save(searchedProvider));
          if (savedProvider !=undefined){
            return new UpdateProviderResponse('Proveedor actualizado correctamente');
          }
        }else{
          return new UpdateProviderResponse('Este proveedor no se encuentra registrado');
        }
      }
      return new RegisterBrandResponse('Hay un error al validar el usuario');
    }catch (e) {
      return new UpdateProviderResponse('Se ha presentado un error al momento de actualizar este producto');
    }
  }
}

export class UpdateProviderRequest{
  constructor(
      public userIdentification: string,
      public token: string,
      public identification: string,
      public street: string,
      public telephone: string,
      public email: string,
      public company: string
  ) {}
}

export class UpdateProviderResponse{
  constructor(
    public message: string
  ) {
  }
}