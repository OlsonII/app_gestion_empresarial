import {Body, Controller, Get, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterClientRequest,
    RegisterClientResponse,
    RegisterClientService
} from "../application/register.client.service";
import {SearchClientRequest, SearchClientService} from "../application/search.client.service";


@Controller(`client`)
export class ClientController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerClient(@Body() request: RegisterClientRequest){
        const service: RegisterClientService = new RegisterClientService(this._unitOfWork);
        const response: RegisterClientResponse = await service.execute(request);
        return response.message;
    }

    @Get()
    async searchProvider(@Body() request: SearchClientRequest){
        const service: SearchClientService = new SearchClientService(this._unitOfWork);
        return await service.execute(request);
    }
}