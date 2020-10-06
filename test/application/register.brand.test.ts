import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection} from "typeorm";
import {
    RegisterBrandRequest,
    RegisterBrandResponse,
    RegisterBrandService
} from "../../src/application/register.brand.service";

const assert = require('assert');

describe('Application tests of register brand', () => {

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
            password: 'Tumama2018',
            database: 'FINANCIAL_MANAGEMENT_TEST',
            entities: ['src/infrastructure/database/entity/*.ts']
        }));
    });

    it('correct registry', async () => {
        const service: RegisterBrandService = new RegisterBrandService(unitOfWork);
        let request = new RegisterBrandRequest(
            '1111',
            'Example'
        );
        let response: RegisterBrandResponse = await service.execute(request);
        assert.equal(response.message, 'Marca registrada con exito')
    });

})