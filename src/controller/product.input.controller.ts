import {Body, Controller, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterProductInputRequest,
    RegisterProductInputService
} from "../application/register.product.input.service";

@Controller('productInput')
export class ProductInputController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProductInput(@Body() request: RegisterProductInputRequest){
        const service: RegisterProductInputService = new RegisterProductInputService(this._unitOfWork);
        return await service.execute(request);
    }

}