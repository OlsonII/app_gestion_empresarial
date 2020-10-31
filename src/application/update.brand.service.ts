import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import {RegisterBrandResponse} from "./register.brand.service";


export class UpdateBrandService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}
  
  async execute(request: UpdateBrandRequest): Promise<UpdateBrandResponse>{
    
    try {

      const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
      if(request.token == user.token){

        const searchedBrand = await this._unitOfWork.brandRepository.findBrand(request.reference);

        if (searchedBrand != undefined){
          searchedBrand.name = request.name;
          this._unitOfWork.start();
          const savedBrand = await this._unitOfWork.complete(async ()=> await this._unitOfWork.brandRepository.save(searchedBrand));
          if (savedBrand !=undefined){
            return new UpdateBrandResponse('Marca actualizada correctamente')
          }
        }else{
          return new UpdateBrandResponse('Esta marca no se encuentra registrada')
        }
      }
      return new RegisterBrandResponse('Hay un error al validar el usuario');

    }catch (e) {
      return new UpdateBrandResponse('Se ha presentado un error al momento de actualizar esta marca')
    }
    
  }
}

export class UpdateBrandRequest{
  constructor(
      public userIdentification: string,
      public token: string,
      public reference: string,
      public name: string
  ) {}
}

export class UpdateBrandResponse{
  constructor(
    public message: string
  ) {
  }
}
