import { IUnitOfWork } from '../infrastructure/contracts/unitOfWork.interface';
import { BrandFactory } from '../domain/factory/brand.factory';


export class UpdateBrandService{
  constructor(private readonly _unitOfWork: IUnitOfWork) {}
  
  async execute(request: UpdateBrandRequest): Promise<UpdateBrandResponse>{
    
    try {
      const searchedBrand = new BrandFactory().create(await this._unitOfWork.brandRepository.findOne({ where: { reference: request.reference } }));

      if (searchedBrand != undefined){
        searchedBrand.name = request.name;
        const savedBrand = await this._unitOfWork.complete(async ()=> await this._unitOfWork.brandRepository.save(searchedBrand));
        if (savedBrand !=undefined){
          return new UpdateBrandResponse('Marca actualizada correctamente')
        }
      }else{
        return new UpdateBrandResponse('Esta marca no se encuentra registrada')
      }
    }catch (e) {
      return new UpdateBrandResponse('Se ha presentado un error al momento de actualizar esta marca')
    }
    
  }
}

export class UpdateBrandRequest{
  constructor(
    public reference: string,
    public name: string
  ) {
  }
}

export class UpdateBrandResponse{
  constructor(
    public message: string
  ) {
  }
}
