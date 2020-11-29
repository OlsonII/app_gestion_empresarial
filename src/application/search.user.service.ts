import {User} from "../domain/entity/user.entity";
import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {RegisterBrandResponse} from "./register.brand.service";

export class SearchUserService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchUserRequest): Promise<SearchUserResponse>{
        try {

            const user = await this._unitOfWork.userRepository.findUser(request.userIdentification);
            if(request.token == user.token){

                if (request.identification == undefined){
                    return new SearchUserResponse(await this._unitOfWork.userRepository.findAllUsers(), null);
                }else{
                    const searchedUser = await  this._unitOfWork.userRepository.findUser(request.identification);
                    if(searchedUser == undefined){
                        return new SearchUserResponse(null,null,'Este usuario no existe')
                    }
                    return new SearchUserResponse(null, searchedUser);
                }

            }
            return new RegisterBrandResponse('Hay un error al validar el usuario');
        }catch (e) {
            return new SearchUserResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
        }
    }

}

export class SearchUserRequest{
    constructor(
        public userIdentification: string,
        public token: string,
        public readonly identification?: string) {}
}

export class SearchUserResponse{
    constructor(public readonly users?: User[], public readonly user?: User, public readonly message?: string) {}
}