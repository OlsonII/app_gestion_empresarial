import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Brand} from "../domain/entity/brand.entity";

export class RegisterBrandService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterBrandRequest): Promise<RegisterBrandResponse>{

        try{
            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){
                let newBrand: Brand;
                const searchedBrand = await this._unitOfWork.brandRepository.findBrand(request.reference);
                if(searchedBrand == undefined){
                    newBrand = new Brand();
                    newBrand.reference = request.reference;
                    newBrand.name = request.name;
                    this._unitOfWork.start();
                    const savedBrand = await this._unitOfWork.complete(async () => await this._unitOfWork.brandRepository.save(newBrand));
                    if(savedBrand != undefined){
                        return new RegisterBrandResponse('Marca registrada con exito');
                    }
                }else{
                    return new RegisterBrandResponse('Esta marca ya se encuentra registrada');
                }
            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e){
            return new RegisterBrandResponse('Ha habido un error al momento de registrar esta marca')
        }

    }

}

export class RegisterBrandRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public reference: string,
        public name: string) {}
}

export class RegisterBrandResponse{
    constructor(public message: string) {}
}