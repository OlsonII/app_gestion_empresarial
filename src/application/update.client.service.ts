import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";

export class UpdateClientService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: UpdateClientRequest): Promise<UpdateClientResponse>{

        try {
            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);

            if(request.token == user.token){
                const clientToUpdate = await this._unitOfWork.clientRepository.findClient(request.identification);
                if(clientToUpdate != undefined){
                    clientToUpdate.identification = request.newIdentification != undefined ? request.newIdentification : clientToUpdate.identification;
                    clientToUpdate.name = request.name != undefined ? request.name : clientToUpdate.name;
                    clientToUpdate.telephone = request.telephone != undefined ? request.telephone : clientToUpdate.telephone;
                    clientToUpdate.email = request.email != undefined ? request.email : clientToUpdate.email;
                    clientToUpdate.street = request.street != undefined ? request.street : clientToUpdate.street;
                    this._unitOfWork.start();
                    await this._unitOfWork.complete(async () => await this._unitOfWork.clientRepository.save(clientToUpdate));
                    return new UpdateClientResponse('Cliente actualizado con exito');
                }
                return new UpdateClientResponse('Este cliente no existe');
            }
            return new UpdateClientResponse('Hay problemas para validar el usuario');
        }catch (e) {
            return new UpdateClientResponse('Ha habido un error al momento de actualiar este cliente')
        }

    }

}

export class UpdateClientRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public identification: string,
        public newIdentification: string,
        public email?: string,
        public name?: string,
        public street?: string,
        public telephone?: string,
    ) {}
}

export class UpdateClientResponse{
    constructor(public readonly message: string) {}
}