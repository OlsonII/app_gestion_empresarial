import {Body, Controller, Get, Post} from "@nestjs/common";
import {
    RegisterProductRequest,
    RegisterProductResponse,
    RegisterProductService
} from "../application/register.product.service";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {SearchProviderRequest, SearchProviderService} from "../application/search.provider.service";
import {SearchProductRequest, SearchProductService} from "../application/search.product.service";

@Controller(`product`)
export class ProductController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProduct(@Body() request: RegisterProductRequest){
        const service: RegisterProductService = new RegisterProductService(this._unitOfWork);
        const response: RegisterProductResponse = await service.execute(request);
        return response.message;
    }

    @Get()
    async searchProduct(@Body() request: SearchProductRequest){
        const service: SearchProductService = new SearchProductService(this._unitOfWork);
        return await service.execute(request);
    }

}