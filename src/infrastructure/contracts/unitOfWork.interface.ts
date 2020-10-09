import {Connection} from "typeorm";
import {BrandRepository} from "../repositories/brand.repository";
import {CategoryRepository} from "../repositories/category.repository";
import {ProviderRepository} from "../repositories/provider.repository";


export interface IUnitOfWork{

    //REPOSITORIES
    brandRepository: BrandRepository;
    categoryRepository: CategoryRepository;
    providerRepository: ProviderRepository;

    start(): void;
    complete(work: () => any): Promise<any>;
    getConnection(): Connection;
    closeConnection();
}