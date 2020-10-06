import {Inject, Injectable} from "@nestjs/common";
import {IUnitOfWork} from "../contracts/unitOfWork.interface";
import {Connection, EntityManager, QueryRunner} from "typeorm";
import {BrandRepository} from "../repositories/brand.repository";
import {BrandOrm} from "../database/entity/brand.orm";


@Injectable()
export class UnitOfWork implements IUnitOfWork{

    private readonly queryRunner: QueryRunner;
    private transactionManager: EntityManager;
    //REPOSITORIES
    public brandRepository: BrandRepository;

    constructor(@Inject('DATABASE_CONNECTION') private readonly asyncDatabaseConnection: Connection) {
        this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
        //REPOSITORIES
        this.brandRepository = this.asyncDatabaseConnection.getCustomRepository(BrandRepository);
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