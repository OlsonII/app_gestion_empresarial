import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterCategoryRequest,
    RegisterCategoryResponse,
    RegisterCategoryService
} from "../application/register.category.service";
import {SearchCategoryRequest, SearchCategoryService} from "../application/search.category.service";
import {
    UpdateCategoryRequest,
    UpdateCategoryResponse,
    UpdateCategoryService,
} from '../application/update.category.service';


@Controller('category')
export class CategoryController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerCategory(@Body() request: RegisterCategoryRequest){
        const service: RegisterCategoryService = new RegisterCategoryService(this._unitOfWork);
        const response: RegisterCategoryResponse = await service.execute(request);
        return response.message;
    }

    @Get()
    async searchBrand(@Body() request: SearchCategoryRequest){
        const service: SearchCategoryService = new SearchCategoryService(this._unitOfWork);
        return await service.execute(request);
    }

    @Put()
    async updateCategory(@Body() request: UpdateCategoryRequest){
        const service: UpdateCategoryService = new UpdateCategoryService(this._unitOfWork);
        const response: UpdateCategoryResponse = await service.execute(request);
        return response.message;
    }

}