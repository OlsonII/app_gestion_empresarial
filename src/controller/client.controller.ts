import {Body, Controller, Get, Headers, Param, Post, Put} from "@nestjs/common";
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

    @Get(':identification')
    async searchSpecifyProvider(@Param('identification') identification, @Headers() headers: string){
        const service: SearchClientService = new SearchClientService(this._unitOfWork);
        return await service.execute(new SearchClientRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1],
            identification
        ));
    }

    @Get()
    async searchProviders(@Headers() headers: string){
        const service: SearchClientService = new SearchClientService(this._unitOfWork);
        return await service.execute(new SearchClientRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1]
        ));
    }

    @Put()
    async updateCategory(@Body() request: UpdateClientRequest){
        const service: UpdateClientService = new UpdateClientService(this._unitOfWork);
        return await service.execute(request);
    }
}