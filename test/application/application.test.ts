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
import {
    SearchProviderRequest,
    SearchProviderResponse,
    SearchProviderService
} from "../../src/application/search.provider.service";
import {
    RegisterProductRequest,
    RegisterProductResponse,
    RegisterProductService
} from "../../src/application/register.product.service";


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
                '1065',
                'Name Example',
                'Street example',
                'phone example'
            );
            const response: RegisterProviderResponse = await service.execute(request);
            expect(response.message).toBe('Proveedor registrado con exito');
        });

        test('find one registry', async () => {

            const service: SearchProviderService = new SearchProviderService(unitOfWork);
            const request = new SearchProviderRequest('1065');
            const response: SearchProviderResponse = await service.execute(request);
            expect(response.provider.identification).toBe('1065');
        });

        test('find many registry', async () => {
            const service: SearchProviderService = new SearchProviderService(unitOfWork);
            const response: SearchProviderResponse = await service.execute(new SearchProviderRequest());
            expect(response.providers.length).toBe(1);
        });

        afterAll(() => {
            return unitOfWork.closeConnection();
        });

    });

    describe('product test', () => {

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
            const registerProviderService = await new RegisterProviderService(unitOfWork).execute(
                new RegisterProviderRequest(
                    'Company Example',
                    'sellerOne@email',
                    '1065',
                    'Name Example',
                    'Street example',
                    'phone example'
                )
            );

            const registerBrandService = await new RegisterBrandService(unitOfWork).execute(
                new RegisterBrandRequest(
                    '1111',
                    'Example Category'
                )
            );

            const registerCategoryService = await new RegisterCategoryService(unitOfWork).execute(
                new RegisterCategoryRequest(
                    '1111',
                    'Example Category'
                )
            );

            const service: RegisterProductService = new RegisterProductService(unitOfWork);
            const response: RegisterProductResponse = await service.execute(
                new RegisterProductRequest(
                    '8563',
                    '1111',
                    '1111',
                    'Product Name Example',
                    '1065',
                    5000,
                    'Description Example'
                )
            );


            expect(response.message).toBe('Producto registrado con exito');
        });

        afterAll(() => {
            return unitOfWork.closeConnection();
        });

    })
})