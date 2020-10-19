import {IBrand} from "../domain/contracts/brand.interface";
import {ICategory} from "../domain/contracts/category.interface";
import {IProvider} from "../domain/contracts/provider.interface";
import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Product} from "../domain/entity/product.entity";
import {SearchProviderRequest, SearchProviderService} from "./search.provider.service";
import {SearchCategoryRequest, SearchCategoryService} from "./search.category.service";
import {SearchBrandRequest, SearchBrandService} from "./search.brand.service";
import {Provider} from "../domain/entity/provider.entity";
import {Category} from "../domain/entity/category.entity";
import {Brand} from "../domain/entity/brand.entity";
import {ObjectID} from "typeorm";
import {ProviderFactory} from "../domain/factory/provider.factory";
import {CategoryFactory} from "../domain/factory/category.factory";
import {BrandFactory} from "../domain/factory/brand.factory";
import {ProductTransaction} from "../domain/entity/product.transaction.entity";
import {ProductFactory} from "../domain/factory/product.factory";
import {RegisterProductInputRequest, RegisterProductInputService} from "./register.product.input.service";

export class RegisterProductService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProductRequest): Promise<RegisterProductResponse>{

        try{
            let newProduct: Product;
            const searchedProduct = await this._unitOfWork.productRepository.findOne({where: {reference: request.reference}});
            if(searchedProduct == undefined){
                newProduct = new Product();
                newProduct.reference = request.reference;
                newProduct.name = request.name;
                newProduct.cost = request.cost;
                newProduct.price = request.price;
                newProduct.quantity = 0;
                newProduct.description = request.description;
                newProduct.category = new CategoryFactory().create(await this._unitOfWork.categoryRepository.findOne({where: {reference: request.categoryReference}}));
                newProduct.brand = new BrandFactory().create(await this._unitOfWork.brandRepository.findOne({where: {reference: request.brandReference}}));
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

                    /*newProduct.insertProduct(request.quantity)
                    transaction.inputQuantity = request.quantity;
                    transaction.outputQuantity = 0;
                    transaction.product = newProduct;
                    transaction.description = 'Registro de producto';
                    transaction.date = new Date().getDate() + '-' + new Date().getMonth() + 1 + '-' + new Date().getFullYear();*/
                }
               /* //SAVE TRANSACTION
                this._unitOfWork.start();
                await this._unitOfWork.complete(async () =>  await this._unitOfWork.productTransactionRepository.save(transaction));*/
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