import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {RegisterBrandRequest, RegisterBrandService} from "../application/register.brand.service";
import {SearchBrandRequest, SearchBrandService} from "../application/search.brand.service";
import { UpdateBrandRequest, UpdateBrandService } from '../application/update.brand.service';

@Controller('brand')
export class BrandController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerBrand(@Body() request: RegisterBrandRequest){
        const service: RegisterBrandService = new RegisterBrandService(this._unitOfWork);
        return await service.execute(request);
    }

    @Get()
    async searchBrand(@Body() request: SearchBrandRequest){
        const service: SearchBrandService = new SearchBrandService(this._unitOfWork);
        return await service.execute(request);
    }

    @Put()
    async updateBrand(@Body() request: UpdateBrandRequest){
        const service: UpdateBrandService = new UpdateBrandService(this._unitOfWork);
        return await service.execute(request);
    }

}