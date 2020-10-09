import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection} from "typeorm";
import {
    RegisterCategoryRequest,
    RegisterCategoryResponse,
    RegisterCategoryService
} from "../../src/application/register.category.service";
import {SearchBrandRequest, SearchBrandResponse, SearchBrandService} from "../../src/application/search.brand.service";
import {
    SearchCategoryRequest,
    SearchCategoryResponse,
    SearchCategoryService
} from "../../src/application/search.category.service";


const assert = require('assert');

describe('Application tests of register category', () => {

    let unitOfWork: IUnitOfWork;

    //TODO: REVISION A ESTOS TESTS

    beforeAll(async ()=>{
        unitOfWork = new UnitOfWork(await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
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

    it('find one registry', async () => {
        const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
        const request = new SearchCategoryRequest(
            '1111'
        );
        const response: SearchCategoryResponse = await service.execute(request);
        assert.equal(response.category, undefined)
    });

    it('find many registry', async () => {
        const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
        const request = new SearchCategoryRequest();
        const response: SearchCategoryResponse = await service.execute(request);
        assert.equal(response.categories.length, '0')
    });

})