import {Body, Controller, Get, Headers, Param, Post, Put} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {RegisterUserRequest, RegisterUserService} from "../application/register.user.service";
import {SearchUserRequest, SearchUserService} from "../application/search.user.service";
import {UpdateUserRequest, UpdateUserService} from "../application/update.user.service";

@Controller('user')
export class UserController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerUser(@Body() request: RegisterUserRequest){
        const service: RegisterUserService = new RegisterUserService(this._unitOfWork);
        return await service.execute(request);
    }

    @Get(':identification')
    async searchSpecifyUser(@Param() identification: string, @Headers() headers: string){
        const service: SearchUserService = new SearchUserService(this._unitOfWork);
        return await service.execute(new SearchUserRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1],
            identification
        ));
    }

    @Get()
    async searchUsers(@Headers() headers: string){
        const service: SearchUserService = new SearchUserService(this._unitOfWork);
        return await service.execute(new SearchUserRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1]
        ));
    }

    @Put()
    async updateUser(@Body() request: UpdateUserRequest){
        const service: UpdateUserService = new UpdateUserService(this._unitOfWork);
        return await service.execute(request);
    }
}