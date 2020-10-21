import {User} from "../domain/entity/user";
import {IUnitOfWork} from "../infrastructure/contracts/unitOfWork.interface";
import {UserFactory} from "../domain/factory/user.factory";

export class SearchUserService{

    constructor(private readonly _unitOfWork: IUnitOfWork) {}

    async execute(request: SearchUserRequest): Promise<SearchUserResponse>{
        try {
            if (request.identification == undefined){
                const users: User[] = [];
                const searchedUsers = await this._unitOfWork.userRepository.find();
                searchedUsers.forEach(provider => {
                    users.push(new UserFactory().create(provider));
                })
                return new SearchUserResponse(users, null);
            }else{
                const searchedUser = await  this._unitOfWork.userRepository.findOne({where: {identification: request.identification}});
                if(searchedUser == undefined){
                    return new SearchUserResponse(null,null,'Este usuario no existe')
                }
                return new SearchUserResponse(null, new UserFactory().create(searchedUser));
            }
        }catch (e) {
            return new SearchUserResponse(null, null, 'Ha habido un error al momento de realizar esta consulta');
        }
    }

}

export class SearchUserRequest{
    constructor(public readonly identification?: string) {}
}

export class SearchUserResponse{
    constructor(public readonly users?: User[], public readonly user?: User, public readonly message?: string) {}
}