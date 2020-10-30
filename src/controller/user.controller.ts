import {Body, Controller, Get, Post, Put} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {RegisterUserRequest, RegisterUserService} from "../application/register.user.service";
import {SearchUserRequest, SearchUserService} from "../application/search.user.service";
import {UpdateUserRequest, UpdateUserService} from "../application/update.user.service";

@Controller('user')
export class UserController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProvider(@Body() request: RegisterUserRequest){
        const service: RegisterUserService = new RegisterUserService(this._unitOfWork);
        return await service.execute(request);
    }

    @Get()
    async searchProvider(@Body() request: SearchUserRequest){
        const service: SearchUserService = new SearchUserService(this._unitOfWork);
        return await service.execute(request);
    }

    @Put()
    async updateCategory(@Body() request: UpdateUserRequest){
        const service: UpdateUserService = new UpdateUserService(this._unitOfWork);
        return await service.execute(request);
    }
}