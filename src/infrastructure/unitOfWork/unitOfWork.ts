import {Inject, Injectable} from "@nestjs/common";
import {IUnitOfWork} from "../contracts/unitOfWork.interface";
import {Connection, EntityManager, MongoRepository, QueryRunner} from "typeorm";
import {BrandRepository} from "../repositories/brand.repository";
import {BrandOrm} from "../database/entity/brand.orm";
import {CategoryRepository} from "../repositories/category.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {ProductRepository} from "../repositories/product.repository";
import {ProviderOrm} from "../database/entity/provider.orm";


@Injectable()
export class UnitOfWork implements IUnitOfWork{

    private readonly queryRunner: QueryRunner;
    private transactionManager: EntityManager;
    //REPOSITORIES
    public brandRepository: BrandRepository;
    public categoryRepository: CategoryRepository;
    public providerRepository: ProviderRepository;
    public productRepository: ProductRepository;

    constructor(@Inject('DATABASE_CONNECTION') private readonly asyncDatabaseConnection: Connection) {
        this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
        //REPOSITORIES
        this.brandRepository = this.asyncDatabaseConnection.getCustomRepository(BrandRepository);
        this.categoryRepository = this.asyncDatabaseConnection.getCustomRepository(CategoryRepository);
        this.providerRepository = this.asyncDatabaseConnection.getCustomRepository(ProviderRepository);
        this.productRepository = this.asyncDatabaseConnection.getCustomRepository(ProductRepository);
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