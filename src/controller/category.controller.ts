import {Body, Controller, Get, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterCategoryRequest,
    RegisterCategoryResponse,
    RegisterCategoryService
} from "../application/register.category.service";
import {SearchBrandRequest, SearchBrandService} from "../application/search.brand.service";
import {SearchCategoryRequest, SearchCategoryService} from "../application/search.category.service";


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

}