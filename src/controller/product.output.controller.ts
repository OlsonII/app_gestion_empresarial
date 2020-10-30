import {Body, Controller, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterProductOutputRequest,
    RegisterProductOutputService
} from "../application/register.product.output.service";

@Controller('productOutput')
export class ProductOutputController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProductInput(@Body() request: RegisterProductOutputRequest){
        const service: RegisterProductOutputService = new RegisterProductOutputService(this._unitOfWork);
        return await service.execute(request);
    }

}