import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {Client} from "../domain/entity/client.entity";

export class RegisterClientService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: RegisterClientRequest): Promise<RegisterClientResponse>{

        try {
            const newClient = new Client();
            const searchedClient = await this._unitOfWork.clientRepository.findOne({where: {identification: request.identification}});
            if(searchedClient == undefined){
                newClient.identification = request.identification;
                newClient.name = request.name;
                newClient.street = request.street;
                newClient.email = request.email;
                newClient.telephone = request.telephone;
                this._unitOfWork.start();
                const savedClient = await this._unitOfWork.complete(async () => await this._unitOfWork.clientRepository.save(newClient));
                if(savedClient != undefined){
                    return new RegisterClientResponse('Cliente registrado satisfactoriamente');
                }
            }
            return new RegisterClientResponse('Este cliente ya se encuentra registrado');
        }catch (e) {
            return new RegisterClientResponse('Se ha presentado un error al momento de registrar este cliente');
        }
    }
}

export class RegisterClientRequest{
    constructor(
        public email: string,
        public identification: string,
        public name: string,
        public street: string,
        public telephone: string,
    ) {}
}

export class RegisterClientResponse{
    constructor(public message: string) {}
}