import {Connection} from "typeorm";
import {BrandRepository} from "../repositories/brand.repository";
import {CategoryRepository} from "../repositories/category.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {ProductRepository} from "../repositories/product.repository";
import {ProductTransactionRepository} from "../repositories/product.transaction.repository";
import {ClientRepository} from "../repositories/client.repository";


export interface IUnitOfWork{

    //REPOSITORIES
    brandRepository: BrandRepository;
    categoryRepository: CategoryRepository;
    providerRepository: ProviderRepository;
    productRepository: ProductRepository;
    productTransactionRepository: ProductTransactionRepository;
    clientRepository: ClientRepository;

    start(): void;
    complete(work: () => any): Promise<any>;
    getConnection(): Connection;
    closeConnection();
}