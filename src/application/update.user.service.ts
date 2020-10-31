import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";

export class UpdateUserService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: UpdateUserRequest): Promise<UpdateUserResponse>{

        try {
            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);

            if(request.token == user.token){
                const userToUpdate = await this._unitOfWork.userRepository.findUser(request.identification);
                if(userToUpdate != undefined){
                    userToUpdate.identification = request.newIdentification != undefined ? request.newIdentification : userToUpdate.identification;
                    userToUpdate.name = request.name != undefined ? request.name : userToUpdate.name;
                    userToUpdate.telephone = request.telephone != undefined ? request.telephone : userToUpdate.telephone;
                    userToUpdate.email = request.email != undefined ? request.email : userToUpdate.email;
                    userToUpdate.street = request.street != undefined ? request.street : userToUpdate.street;
                    userToUpdate.rol = request.rol != undefined ? request.rol : userToUpdate.rol;
                    userToUpdate.password = request.password != undefined ? request.password : userToUpdate.password;
                    this._unitOfWork.start();
                    await this._unitOfWork.complete(async () => await this._unitOfWork.clientRepository.save(userToUpdate));
                    return new UpdateUserResponse('Usuario actualizado con exito');
                }
                return new UpdateUserResponse('Este usuario no existe');
            }
            return new UpdateUserResponse('Hay problemas para validar el usuario');
        }catch (e) {
            return new UpdateUserResponse('Ha habido un error al momento de actualiar este usuario')
        }
    }
}

export class UpdateUserRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public identification: string,
        public newIdentification?: string,
        public email?: string,
        public name?: string,
        public street?: string,
        public telephone?: string,
        public password?: string,
        public rol?: string
    ) {}
}

export class UpdateUserResponse{
    constructor(public readonly message: string) {}
}