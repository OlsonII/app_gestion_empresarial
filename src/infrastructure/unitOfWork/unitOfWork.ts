import {Inject, Injectable} from "@nestjs/common";
import {IUnitOfWork} from "../contracts/unitOfWork.interface";
import {Connection, EntityManager, QueryRunner} from "typeorm";
import {BrandRepository} from "../repositories/brand.repository";
import {CategoryRepository} from "../repositories/category.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {ProductRepository} from "../repositories/product.repository";
import {ProductTransactionRepository} from "../repositories/product.transaction.repository";
import {ClientRepository} from "../repositories/client.repository";
import {UserRepository} from "../repositories/user.repository";
import { FinancialMovementRepository } from '../repositories/financial.movement.repository';


@Injectable()
export class UnitOfWork implements IUnitOfWork{

    private readonly queryRunner: QueryRunner;
    private transactionManager: EntityManager;
    //REPOSITORIES
    public brandRepository: BrandRepository;
    public categoryRepository: CategoryRepository;
    public providerRepository: ProviderRepository;
    public productRepository: ProductRepository;
    public productTransactionRepository: ProductTransactionRepository;
    public clientRepository: ClientRepository;
    public userRepository: UserRepository;
    public financialMovementRepository: FinancialMovementRepository;

    constructor(@Inject('DATABASE_CONNECTION') private readonly asyncDatabaseConnection: Connection) {
        this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
        //REPOSITORIES
        this.brandRepository = this.asyncDatabaseConnection.getCustomRepository(BrandRepository);
        this.categoryRepository = this.asyncDatabaseConnection.getCustomRepository(CategoryRepository);
        this.providerRepository = this.asyncDatabaseConnection.getCustomRepository(ProviderRepository);
        this.productRepository = this.asyncDatabaseConnection.getCustomRepository(ProductRepository);
        this.productTransactionRepository = this.asyncDatabaseConnection.getCustomRepository(ProductTransactionRepository);
        this.clientRepository = this.asyncDatabaseConnection.getCustomRepository(ClientRepository);
        this.userRepository = this.asyncDatabaseConnection.getCustomRepository(UserRepository);
        this.financialMovementRepository = this.asyncDatabaseConnection.getCustomRepository(FinancialMovementRepository);
    }

    setTransactionManager(){
        this.transactionManager = this.queryRunner.manager;
    }

    async complete(work: () => any): Promise<any> {
        try{
            const response = await work();
            await this.queryRunner.commitTransaction();
            return response;
        }catch (error){
            await this.queryRunner.rollbackTransaction();
            return error.toString();
        }finally {
            await this.queryRunner.release();
        }
    }

    public getConnection(): Connection{
        return this.asyncDatabaseConnection;
    }

    async start() {
        await this.queryRunner.startTransaction();
        this.setTransactionManager();
    }

    async closeConnection(){
        await this.asyncDatabaseConnection.close();
        await this.queryRunner.manager.connection.close();
    }



}