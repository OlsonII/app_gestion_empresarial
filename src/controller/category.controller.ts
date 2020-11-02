import {Body, Controller, Get, Headers, Param, Post, Put} from '@nestjs/common';
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterCategoryRequest,
    RegisterCategoryService
} from "../application/register.category.service";
import {SearchCategoryRequest, SearchCategoryService} from "../application/search.category.service";
import {
    UpdateCategoryRequest,
    UpdateCategoryService,
} from '../application/update.category.service';
import {SearchBrandRequest} from "../application/search.brand.service";


@Controller('category')
export class CategoryController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerCategory(@Body() request: RegisterCategoryRequest){
        const service: RegisterCategoryService = new RegisterCategoryService(this._unitOfWork);
        return await service.execute(request);
    }

    @Get(':reference')
    async searchSpecifyCategory(@Param('reference') reference: string, @Headers() headers: string){
        const service: SearchCategoryService = new SearchCategoryService(this._unitOfWork);
        return await service.execute(new SearchCategoryRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1],
            reference
        ));
    }

    @Get()
    async searchCategories(@Headers() headers: string){
        const service: SearchCategoryService = new SearchCategoryService(this._unitOfWork);
        return await service.execute(new SearchCategoryRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1]
        ));
    }

    @Put()
    async updateCategory(@Body() request: UpdateCategoryRequest){
        const service: UpdateCategoryService = new UpdateCategoryService(this._unitOfWork);
        return await service.execute(request);
    }

}