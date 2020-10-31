import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {RegisterBrandResponse} from "./register.brand.service";

export class UpdateProductService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {

        try {

            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){

                const searchedProduct = await this._unitOfWork.productRepository.findProduct(request.productReference);

                if(searchedProduct != undefined){
                    searchedProduct.price = request.price != undefined ? request.price : searchedProduct.price;
                    searchedProduct.cost = request.cost != undefined ? request.cost : searchedProduct.cost;
                    searchedProduct.description = request.description != undefined ? request.description : searchedProduct.description;
                    request.categoryReference != undefined ? searchedProduct.category = await this._unitOfWork.categoryRepository.findCategory(request.categoryReference) : null;
                    this._unitOfWork.start();
                    const savedProduct = await this._unitOfWork.complete(async () => await this._unitOfWork.productRepository.save(searchedProduct));
                    if(savedProduct != undefined){
                        return new UpdateProductResponse('Producto actualizado correctamente');
                    }
                }else{
                    return new UpdateProductResponse('Este producto no se encuentra registrado');
                }
            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e) {
            return new UpdateProductResponse('Se ha presentado un error al momento de actualizar este producto');
        }
    }
}

export class UpdateProductRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public productReference: string,
        public price: number,
        public cost: number,
        public categoryReference: string,
        public description: string
    ) {}
}

export class UpdateProductResponse{
    constructor(
        public message: string
    ) {}
}