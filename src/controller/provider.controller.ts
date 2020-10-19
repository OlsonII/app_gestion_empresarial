import {Body, Controller, Get, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterProviderRequest,
    RegisterProviderResponse,
    RegisterProviderService
} from "../application/register.provider.service";
import { SearchProviderRequest, SearchProviderService } from '../application/search.provider.service';

@Controller('provider')
export class ProviderController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProvider(@Body() request: RegisterProviderRequest){
        const service: RegisterProviderService = new RegisterProviderService(this._unitOfWork);
        const response: RegisterProviderResponse = await service.execute(request);
        return response.message;
    }

    @Get()
    async searchProvider(@Body() request: SearchProviderRequest){
        const service: SearchProviderService = new SearchProviderService(this._unitOfWork);
        return await service.execute(request);
    }

}