import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection} from "typeorm";
import {
    RegisterProviderRequest,
    RegisterProviderResponse,
    RegisterProviderService
} from "../../src/application/register.provider.service";

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
        const service: RegisterProviderService = new RegisterProviderService(unitOfWork);
        const request = new RegisterProviderRequest(
            'Company Example',
            'sellerOne@email',
            '1065',
            'Name Example',
            '1065',
            'Street example',
            'phone example'
        );
        const response: RegisterProviderResponse = await service.execute(request);
        assert.equal(response.message, 'Proveedor registrado con exito')
    });

})