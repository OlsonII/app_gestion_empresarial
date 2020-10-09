import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection} from "typeorm";
import {
    RegisterCategoryRequest,
    RegisterCategoryResponse,
    RegisterCategoryService
} from "../../src/application/register.category.service";


const assert = require('assert');

describe('Application tests of register category', () => {

    let unitOfWork: IUnitOfWork;

    beforeEach(async ()=>{
        unitOfWork = new UnitOfWork(await createConnection({
            name: 'test',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            dropSchema: true,
            synchronize: true,
            logging: true,
            username: 'root',
            password: '1981',
            database: 'FINANCIAL_MANAGEMENT_TEST',
            entities: ['src/infrastructure/database/entity/*.ts']
        }));
    });

    it('correct registry', async () => {
        const service: RegisterCategoryService = new RegisterCategoryService(unitOfWork);
        const request = new RegisterCategoryRequest(
            '1111',
            'Example Category'
        );
        const response: RegisterCategoryResponse = await service.execute(request);
        assert.equal(response.message, 'Categoria registrada con exito')
    });

})