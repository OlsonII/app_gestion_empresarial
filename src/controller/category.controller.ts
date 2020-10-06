import {Body, Controller, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterCategoryRequest,
    RegisterCategoryResponse,
    RegisterCategoryService
} from "../application/register.category.service";


@Controller('category')
export class CategoryController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerCategory(@Body() request: RegisterCategoryRequest){
        const service: RegisterCategoryService = new RegisterCategoryService(this._unitOfWork);
        const response: RegisterCategoryResponse = await service.execute(request);
        return response.message;
    }

}