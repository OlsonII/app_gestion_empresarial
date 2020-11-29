import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {UserOrm} from "../database/entity/user.orm";
import {User} from "../../domain/entity/user.entity";

@Injectable()
@EntityRepository(UserOrm)
export class UserRepository extends GenericRepository<UserOrm>{

    mappedOrmToUser(orm: UserOrm): User{
        const user = new User();
        user._id = orm._id;
        user.identification = orm.identification;
        user.name = orm.name;
        user.street = orm.street;
        user.telephone = orm.telephone;
        user.email = orm.email;
        user.password = orm.password;
        user.rol = orm.rol;
        user.token = orm.token;
        return user;
    }

    async login(user: UserOrm): Promise<User>{
        return this.mappedOrmToUser(await this.save(user));
    }

    async findUser(identification: string): Promise<User> {
        const orm = await this.findOne({where: {identification: identification}});
        return orm == undefined ? undefined : this.mappedOrmToUser(orm);
    }

    async findAllUsers(): Promise<User[]> {
        const users: User[] = [];
        const searchedUsers = await this.find();
        searchedUsers.forEach(orm => users.push(this.mappedOrmToUser(orm)));
        return users;
    }

}