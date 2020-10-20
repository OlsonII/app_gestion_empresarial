import {Body, Controller, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterClientRequest,
    RegisterClientResponse,
    RegisterClientService
} from "../application/register.client.service";


@Controller(`client`)
export class ClientController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerClient(@Body() request: RegisterClientRequest){
        const service: RegisterClientService = new RegisterClientService(this._unitOfWork);
        const response: RegisterClientResponse = await service.execute(request);
        return response.message;
    }

}