import {Controller, Post} from "@nestjs/common";
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {LoginRequest, LoginService} from "../application/login.service";

@Controller('login')
export class LoginController {

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async login(request: LoginRequest){
        const service: LoginService = new LoginService(this._unitOfWork);
        return await service.execute(request);
    }

}