import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Product} from "../domain/entity/product.entity";
import {RegisterProductInputRequest, RegisterProductInputService} from "./register.product.input.service";

export class RegisterProductService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProductRequest): Promise<RegisterProductResponse>{

        try{
            let newProduct: Product;
            const searchedProduct = await this._unitOfWork.productRepository.findProduct(request.reference);
            if(searchedProduct == undefined){
                newProduct = new Product();
                newProduct.reference = request.reference;
                newProduct.name = request.name;
                newProduct.cost = request.cost;
                newProduct.price = request.price;
                newProduct.quantity = 0;
                newProduct.description = request.description;
                newProduct.category = await this._unitOfWork.categoryRepository.findCategory(request.categoryReference);
                newProduct.brand = await this._unitOfWork.brandRepository.findBrand(request.brandReference);
                this._unitOfWork.start();
                const savedProduct = await this._unitOfWork.complete(async () => await this._unitOfWork.productRepository.save(newProduct));

                if(request.quantity > 0){

                    const response = await new RegisterProductInputService(this._unitOfWork).execute(new RegisterProductInputRequest(
                        request.quantity,
                        newProduct.reference,
                        'Registro de producto'
                    ));

                    if(response.message == 'Transaccion registrada con exito'){
                        return new RegisterProductResponse('Producto registrado con exito');
                    }
                }
                if(savedProduct != undefined){
                    return new RegisterProductResponse('Producto registrado con exito');
                }
            }else{
                return new RegisterProductResponse('Este producto ya se encuentra registrado')
            }
        }catch (e){
            console.log(e.toString());
            return new RegisterProductResponse('Ha habido un error al momento de registrar este producto')
        }
    }

}

export class RegisterProductRequest{
    constructor(
        public reference: string,
        public brandReference: string,
        public categoryReference: string,
        public name: string,
        public cost?: number,
        public description?: string,
        public quantity?: number,
        public price?: number,
    ) {}
}

export class RegisterProductResponse{
    constructor(public readonly message: string) {}
}