import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection} from "typeorm";
import {
    RegisterBrandRequest,
    RegisterBrandResponse,
    RegisterBrandService
} from "../../src/application/register.brand.service";
import {SearchBrandRequest, SearchBrandResponse, SearchBrandService} from "../../src/application/search.brand.service";

const assert = require('assert');

describe('Application tests of register brand', () => {

    let unitOfWork: IUnitOfWork;

    beforeAll(async ()=>{
        unitOfWork = new UnitOfWork(await createConnection({
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
        const service: RegisterBrandService = new RegisterBrandService(unitOfWork);
        const request = new RegisterBrandRequest(
            '1111',
            'Example'
        );
        const response: RegisterBrandResponse = await service.execute(request);
        assert.equal(response.message, 'Marca registrada con exito')
    });

    it('find one registry', async () => {
        const service: SearchBrandService = new SearchBrandService(unitOfWork);
        const request = new SearchBrandRequest(
            '1111'
        );
        const response: SearchBrandResponse = await service.execute(request);
        assert.equal(response.brand.reference, '1111')
    });

    it('find many registry', async () => {
        const service: SearchBrandService = new SearchBrandService(unitOfWork);
        const request = new SearchBrandRequest();
        const response: SearchBrandResponse = await service.execute(request);
        assert.equal(response.brands.length, '1')
    });

})