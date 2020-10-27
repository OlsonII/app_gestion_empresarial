import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {ProviderOrm} from "../database/entity/provider.orm";
import {Provider} from "../../domain/entity/provider.entity";

@Injectable()
@EntityRepository(ProviderOrm)
export class ProviderRepository extends GenericRepository<ProviderOrm>{

    mappedOrmToProvider(orm: ProviderOrm): Provider {
        const provider = new Provider();
        provider._id = orm._id;
        provider.identification = orm.identification;
        provider.name = orm.name;
        provider.street = orm.street;
        provider.company = orm.company;
        provider.telephone = orm.telephone;
        provider.email = orm.email;
        return provider;
    }

    async findProvider(identification: string): Promise<Provider>{
        const orm = await this.findOne({where: {identification: identification}});
        return orm == undefined ? undefined : this.mappedOrmToProvider(orm);
    }

    async findAllProviders(): Promise<Provider[]> {
        const providers: Provider[] = [];
        const searchedProviders = await this.find();
        searchedProviders.forEach(orm => providers.push(this.mappedOrmToProvider(orm)));
        return providers;
    }

}