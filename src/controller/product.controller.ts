import {Body, Controller, Get, Post, Put, Req} from "@nestjs/common";
import {
    RegisterProductRequest,
    RegisterProductService
} from "../application/register.product.service";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {SearchProductRequest, SearchProductService} from "../application/search.product.service";
import {UpdateProductRequest, UpdateProductService} from "../application/update.product.service";
import {RegisterProductInputRequest, RegisterProductInputService} from "../application/register.product.input.service";
import {
    RegisterProductOutputRequest,
    RegisterProductOutputService
} from "../application/register.product.output.service";

@Controller(`product`)
export class ProductController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProduct(@Body() request: RegisterProductRequest){
        const service: RegisterProductService = new RegisterProductService(this._unitOfWork);
        return await service.execute(request);
    }

    @Get()
    async searchProduct(@Req() request: SearchProductRequest){
        const service: SearchProductService = new SearchProductService(this._unitOfWork);
        return await service.execute(request);
    }

    @Put()
    async updateProduct(@Body() request: UpdateProductRequest){
        const service: UpdateProductService = new UpdateProductService(this._unitOfWork);
        return await service.execute(request);
    }

    @Post('input')
    async registerProductInput(@Body() request: RegisterProductInputRequest){
        const service: RegisterProductInputService = new RegisterProductInputService(this._unitOfWork);
        return await service.execute(request);
    }

    @Post('output')
    async registerProductOutput(@Body() request: RegisterProductOutputRequest){
        const service: RegisterProductOutputService = new RegisterProductOutputService(this._unitOfWork);
        return await service.execute(request);
    }

}