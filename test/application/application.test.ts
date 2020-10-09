import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection, getConnection} from "typeorm";
import {
    RegisterBrandRequest,
    RegisterBrandResponse,
    RegisterBrandService
} from "../../src/application/register.brand.service";
import {SearchBrandRequest, SearchBrandResponse, SearchBrandService} from "../../src/application/search.brand.service";
import {
    RegisterCategoryRequest,
    RegisterCategoryResponse,
    RegisterCategoryService
} from "../../src/application/register.category.service";
import {
    SearchCategoryRequest,
    SearchCategoryResponse,
    SearchCategoryService
} from "../../src/application/search.category.service";
import {
    RegisterProviderRequest,
    RegisterProviderResponse,
    RegisterProviderService
} from "../../src/application/register.provider.service";


describe('Application tests', () => {

    let unitOfWork: IUnitOfWork;

    describe('brand test', () => {

        beforeAll(async ()=>{
            unitOfWork = new UnitOfWork(await createConnection({
                type: 'sqlite',
                database: ':memory:',
                logging: false,
                dropSchema: true,
                synchronize: true,
                entities: ['src/infrastructure/database/entity/*.ts']
            }));
        });

        test('correct registry', async () => {
            const service: RegisterBrandService = new RegisterBrandService(unitOfWork);
            const request = new RegisterBrandRequest(
                '1111',
                'Example'
            );
            const response: RegisterBrandResponse = await service.execute(request);
            expect(response.message).toBe('Marca registrada con exito');
        });

        test('find one registry', async () => {
            const service: SearchBrandService = new SearchBrandService(unitOfWork);
            const request = new SearchBrandRequest(
                '1111'
            );
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.brand.reference).toBe('1111');
        });

        test('find many registry', async () => {
            const service: SearchBrandService = new SearchBrandService(unitOfWork);
            const request = new SearchBrandRequest();
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.brands.length).toBe(1);
        });

        afterAll(() => {
            return unitOfWork.closeConnection();
        });
    });

    describe('category tests', () => {

        beforeAll(async ()=>{
            unitOfWork = new UnitOfWork(await createConnection({
                type: 'sqlite',
                database: ':memory:',
                logging: false,
                dropSchema: true,
                synchronize: true,
                entities: ['src/infrastructure/database/entity/*.ts']
            }));
        });

        test('correct registry', async () => {
            const service: RegisterCategoryService = new RegisterCategoryService(unitOfWork);
            const request = new RegisterCategoryRequest(
                '1111',
                'Example Category'
            );
            const response: RegisterCategoryResponse = await service.execute(request);
            expect(response.message).toBe('Categoria registrada con exito');
        });

        test('find one registry', async () => {

            const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
            const request = new SearchCategoryRequest(
                '1111'
            );
            const response: SearchCategoryResponse = await service.execute(request);
            expect(response.category.reference).toBe('1111');
        });

        test('find many registry', async () => {
            const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
            const response: SearchCategoryResponse = await service.execute(new SearchCategoryRequest());
            expect(response.categories.length).toBe(1);
        });

        afterAll(() => {
            return unitOfWork.closeConnection();
        });
    });

    describe('provider tests', () => {

        beforeAll(async ()=>{
            unitOfWork = new UnitOfWork(await createConnection({
                type: 'sqlite',
                database: ':memory:',
                logging: false,
                dropSchema: true,
                synchronize: true,
                entities: ['src/infrastructure/database/entity/*.ts']
            }));
        });

        test('correct registry', async () => {
            const service: RegisterProviderService = new RegisterProviderService(unitOfWork);
            const request = new RegisterProviderRequest(
                'Company Example',
                'sellerOne@email',
                'Name Example',
                '1065',
                'Street example',
                'phone example'
            );
            const response: RegisterProviderResponse = await service.execute(request);
            expect(response.message).toBe('Proveedor registrado con exito');
        });

        afterAll(() => {
            return unitOfWork.closeConnection();
        });

    });

})