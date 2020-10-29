import {Body, Controller, Get, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {RegisterUserRequest, RegisterUserResponse, RegisterUserService} from "../application/register.user.service";
import {SearchUserRequest, SearchUserService} from "../application/search.user.service";

@Controller('user')
export class UserController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProvider(@Body() request: RegisterUserRequest){
        const service: RegisterUserService = new RegisterUserService(this._unitOfWork);
        const response: RegisterUserResponse = await service.execute(request);
        return response.message;
    }

    @Get()
    async searchProvider(@Body() request: SearchUserRequest){
        const service: SearchUserService = new SearchUserService(this._unitOfWork);
        return await service.execute(request);
    }

}