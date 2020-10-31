import {Client} from "../domain/entity/client.entity";
import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {RegisterBrandResponse} from "./register.brand.service";

export class SearchClientService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchClientRequest): Promise<SearchClientResponse>{
        try {

            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){

                if (request.identification == undefined){
                    return new SearchClientResponse(await this._unitOfWork.clientRepository.findAllClients(), null);
                }else{
                    const searchedClient = await  this._unitOfWork.clientRepository.findClient(request.identification);
                    if(searchedClient == undefined){
                        return new SearchClientResponse(null,null,'Este cliente no existe')
                    }
                    return new SearchClientResponse(null, searchedClient);
                }

            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e) {
            return new SearchClientResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
        }
    }

}

export class SearchClientRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public readonly identification?: string) {}
}

export class SearchClientResponse{
    constructor(public readonly clients?: Client[], public readonly client?: Client, public readonly message?: string) {}
}