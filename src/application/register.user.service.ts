import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {User} from "../domain/entity/user.entity";
import {RegisterBrandResponse} from "./register.brand.service";

export class RegisterUserService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterUserRequest): Promise<RegisterUserResponse>{

        try {

            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){

                const newUser = new User();
                const searchedUser = await this._unitOfWork.userRepository.findUser(request.identification);

                if(searchedUser == undefined){
                    newUser.identification = request.identification;
                    newUser.name = request.name;
                    newUser.rol = request.rol;
                    newUser.street = request.street;
                    newUser.telephone = request.telephone;
                    newUser.password = request.password;
                    newUser.email = request.email;

                    this._unitOfWork.start();
                    const registeredUser = await this._unitOfWork.complete(async () => await this._unitOfWork.userRepository.save(newUser));
                    if(registeredUser != undefined){
                        return new RegisterUserResponse('Usuario registrado satisfactoriamente');
                    }
                }
                return new RegisterUserResponse('Este usuario ya se encuentra registrado');
            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e) {
            return new RegisterUserResponse('Se ha presentado un error al momento de registrar a este usuario');
        }
    }

}

export class RegisterUserRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public email: string,
        public identification: string,
        public name: string,
        public street: string,
        public telephone: string,
        public password: string,
        public rol: string,
    ) {}
}

export class RegisterUserResponse{
    constructor(public readonly message: string) {}
}