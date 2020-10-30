import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {User} from "../domain/entity/user";
import {Token} from "../infrastructure/authentication/token";

export class LoginService {

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: LoginRequest): Promise<LoginResponse>{
        const user: User = await this._unitOfWork.userRepository.findUser(request.identification);
        if(user != undefined){
            if (user.password == request.password){
                const token = new Token();
                user.token = token.generateToken();
                this._unitOfWork.start();
                const loggedUser = await this._unitOfWork.complete(async () => await this._unitOfWork.userRepository.login(user));
                return new LoginResponse(loggedUser);
            }
            return new LoginResponse(undefined, 'Contraseña incorrecta');
        }
        return new LoginResponse(undefined, 'Este usuario no se encuentra registrado');
    }
}

export class LoginRequest {
    constructor(
        public identification: string,
        public password: string
    ) {}
}

export class LoginResponse {
    constructor(
       public readonly user: User,
       public readonly message?: string
    ) {}
}