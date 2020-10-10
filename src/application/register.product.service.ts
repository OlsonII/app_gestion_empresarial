import {IBrand} from "../domain/contracts/brand.interface";
import {ICategory} from "../domain/contracts/category.interface";
import {IProvider} from "../domain/contracts/provider.interface";
import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Product} from "../domain/entity/product.entity";
import {SearchProviderRequest, SearchProviderService} from "./search.provider.service";
import {SearchCategoryRequest, SearchCategoryService} from "./search.category.service";
import {SearchBrandRequest, SearchBrandService} from "./search.brand.service";

export class RegisterProductService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterProductRequest): Promise<RegisterProductResponse>{
        let newProduct: Product;
        const searchedCategory = await this._unitOfWork.productRepository.findOne(request.reference);
        if(searchedCategory == undefined){
            newProduct = new Product();
            newProduct.reference = request.reference;
            newProduct.name = request.name;
            newProduct.cost = request.cost;
            newProduct.price = request.price;
            newProduct.description = request.description;
            newProduct.quantity = request.quantity;
            const searchProviderService = await new SearchProviderService(this._unitOfWork).execute(new SearchProviderRequest(request.providerIdentification));
            newProduct.provider = searchProviderService.provider;
            const searchCategoryService = await new SearchCategoryService(this._unitOfWork).execute(new SearchCategoryRequest(request.categoryReference));
            newProduct.category = searchCategoryService.category;
            const searchBrandService = await new SearchBrandService(this._unitOfWork).execute(new SearchBrandRequest(request.brandReference));
            newProduct.brand = searchBrandService.brand;
            this._unitOfWork.start();
            const savedProduct = await this._unitOfWork.complete(async () => await this._unitOfWork.productRepository.save(newProduct));
            if(savedProduct != undefined){
                return new RegisterProductResponse('Producto registrado con exito');
            }
            return new RegisterProductResponse('Ha habido un error al momento de registrar este producto')
        }
        return new RegisterProductResponse('Este producto ya se encuentra registrado')
    }

}

export class RegisterProductRequest{
    constructor(
        public reference: string,
        public brandReference: string,
        public categoryReference: string,
        public name: string,
        public providerIdentification: string,
        public cost?: number,
        public description?: string,
        public quantity?: number,
        public price?: number,
    ) {}
}

export class RegisterProductResponse{
    constructor(public readonly message: string) {}
}