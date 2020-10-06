import {Body, Controller, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {RegisterBrandRequest, RegisterBrandResponse, RegisterBrandService} from "../application/register.brand.service";

@Controller('brand')
export class BrandController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerBrand(@Body() request: RegisterBrandRequest){
        const service: RegisterBrandService = new RegisterBrandService(this._unitOfWork);
        const response: RegisterBrandResponse = await service.execute(request);
        return response.message;
    }

}