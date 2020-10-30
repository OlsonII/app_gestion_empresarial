import {Body, Controller, Get, Post, Put} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterClientRequest,
    RegisterClientService
} from "../application/register.client.service";
import {SearchClientRequest, SearchClientService} from "../application/search.client.service";
import {UpdateClientRequest, UpdateClientService} from "../application/update.client.service";


@Controller(`client`)
export class ClientController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerClient(@Body() request: RegisterClientRequest){
        const service: RegisterClientService = new RegisterClientService(this._unitOfWork);
        return await service.execute(request);
    }

    @Get()
    async searchProvider(@Body() request: SearchClientRequest){
        const service: SearchClientService = new SearchClientService(this._unitOfWork);
        return await service.execute(request);
    }

    @Put()
    async updateCategory(@Body() request: UpdateClientRequest){
        const service: UpdateClientService = new UpdateClientService(this._unitOfWork);
        return await service.execute(request);
    }
}