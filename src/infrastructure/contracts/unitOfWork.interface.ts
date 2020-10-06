import {Connection} from "typeorm";
import {BrandRepository} from "../repositories/brand.repository";


export interface IUnitOfWork{

    //REPOSITORIES
    brandRepository: BrandRepository;

    start(): void;
    complete(work: () => any): Promise<any>;
    getConnection(): Connection;
    closeConnection();
}