import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection} from "typeorm";
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
import {
    SearchProductRequest,
    SearchProductResponse,
    SearchProductService,
} from '../../src/application/search.product.service';
import {
    RegisterProductInputRequest, RegisterProductInputResponse,
    RegisterProductInputService
} from "../../src/application/register.product.input.service";
import {
    RegisterProductOutputRequest,
    RegisterProductOutputResponse,
    RegisterProductOutputService
} from "../../src/application/register.product.output.service";
import {
    UpdateProductRequest,
    UpdateProductResponse,
    UpdateProductService
} from "../../src/application/update.product.service";
import {UpdateBrandRequest, UpdateBrandResponse, UpdateBrandService} from "../../src/application/update.brand.service";
import {
    UpdateCategoryRequest,
    UpdateCategoryResponse,
    UpdateCategoryService
} from "../../src/application/update.category.service";
import {
    UpdateProviderRequest,
    UpdateProviderResponse,
    UpdateProviderService
} from "../../src/application/update.provider.service";
import {
    RegisterClientRequest,
    RegisterClientResponse,
    RegisterClientService
} from "../../src/application/register.client.service";
import {
    SearchClientRequest,
    SearchClientResponse,
    SearchClientService
} from "../../src/application/search.client.service";
import {RegisterUserRequest, RegisterUserService} from "../../src/application/register.user.service";
import {SearchUserRequest, SearchUserResponse, SearchUserService} from "../../src/application/search.user.service";


describe('Application tests', () => {

    let unitOfWork: IUnitOfWork;

    beforeAll(async ()=>{
        unitOfWork = new UnitOfWork(await createConnection({
            type: 'mongodb',
            url: 'mongodb+srv://olson:1981@cluster0.fhagr.mongodb.net/memory?retryWrites=true&w=majority',
            logging: true,
            useNewUrlParser: true,
            dropSchema: true,
            synchronize: true,
            entities: ['src/infrastructure/database/entity/*.ts']
        }));
    });

    describe('brand test', () => {

        test('correct registry', async () => {
            const service: RegisterBrandService = new RegisterBrandService(unitOfWork);
            const request = new RegisterBrandRequest(
                '1111',
                'Example'
            );
            const response: RegisterBrandResponse = await service.execute(request);
            expect(response.message).toBe('Marca registrada con exito');
        });

        test('duplicate registry', async () => {
            const service: RegisterBrandService = new RegisterBrandService(unitOfWork);
            const request = new RegisterBrandRequest(
              '1111',
              'Example'
            );

            await service.execute(request);

            const response: RegisterBrandResponse = await service.execute(request);
            expect(response.message).toBe('Esta marca ya se encuentra registrada');
        });

        test('find one registry', async () => {
            const service: SearchBrandService = new SearchBrandService(unitOfWork);
            const request = new SearchBrandRequest(
                '1111'
            );
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.brand.reference).toBe('1111');
        });

        test('find a non-existent registry', async () => {
            const service: SearchBrandService = new SearchBrandService(unitOfWork);
            const request = new SearchBrandRequest(
              '1112'
            );
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.message).toBe('Esta marca no existe');
        });

        test('find many registry', async () => {
            const service: SearchBrandService = new SearchBrandService(unitOfWork);
            const request = new SearchBrandRequest();
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.brands.length).toBe(1);
        });

        test( 'correct update brand', async ()=>{
            await new RegisterBrandService(unitOfWork).execute(
              new RegisterBrandRequest(
                '1111',
                'Example'
              )
            );

            const service = new UpdateBrandService(unitOfWork);
            const response: UpdateBrandResponse = await service.execute(
              new UpdateBrandRequest(
                '1111',
                'Example Update Brand'
              )
            );
           expect(response.message).toBe('Marca actualizada correctamente')
        });
    });

    describe('category tests', () => {

        test('correct registry', async () => {
            const service: RegisterCategoryService = new RegisterCategoryService(unitOfWork);
            const request = new RegisterCategoryRequest(
                '1111',
                'Example Category'
            );
            const response: RegisterCategoryResponse = await service.execute(request);
            expect(response.message).toBe('Categoria registrada con exito');
        });

        test('duplicate registry', async () => {
            const service: RegisterCategoryService = new RegisterCategoryService(unitOfWork);
            const request = new RegisterCategoryRequest(
              '1111',
              'Example Category'
            );

            await service.execute(request);

            const response: RegisterCategoryResponse = await service.execute(request);
            expect(response.message).toBe('Esta categoria ya se encuentra registrada');
        });

        test('find one registry', async () => {

            const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
            const request = new SearchCategoryRequest(
                '1111'
            );
            const response: SearchCategoryResponse = await service.execute(request);
            expect(response.category.reference).toBe('1111');
        });

        test('find a non-existent registry', async () => {

            const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
            const request = new SearchCategoryRequest(
              '1112'
            );
            const response: SearchCategoryResponse = await service.execute(request);
            expect(response.message).toBe('Esta categoria no existe');
        });

        test('find many registry', async () => {
            const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
            const response: SearchCategoryResponse = await service.execute(new SearchCategoryRequest());
            expect(response.categories.length).toBe(1);
        });

        test('correct update category', async () => {
            await new RegisterCategoryService(unitOfWork).execute(
              new RegisterCategoryRequest(
                  '1111',
                  'Example Category'
              )
            );

            const service = new UpdateCategoryService(unitOfWork);
            const response: UpdateCategoryResponse = await service.execute(
              new UpdateCategoryRequest(
                '1111',
                'Example Update Category'
              )
            );
            expect(response.message).toBe('Categoria actualizada correctamente')
        });
    });

    describe('provider tests', () => {

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

        test('duplicate registry', async () => {

            const service: RegisterProviderService = new RegisterProviderService(unitOfWork);
            const request = new RegisterProviderRequest(
              'Company Example',
              'sellerOne@email',
              '1065',
              'Name Example',
              'Street example',
              'phone example'
            );

            await service.execute(request);

            const response: RegisterProviderResponse = await service.execute(request);
            expect(response.message).toBe('Este proveedor ya se encuentra registrado');
        });

        test('find one registry', async () => {

            const service: SearchProviderService = new SearchProviderService(unitOfWork);
            const request = new SearchProviderRequest('1065');
            const response: SearchProviderResponse = await service.execute(request);
            expect(response.provider.identification).toBe('1065');
        });

        test('find a non-existent registry', async () => {

            const service: SearchProviderService = new SearchProviderService(unitOfWork);
            const request = new SearchProviderRequest('1066');
            const response: SearchProviderResponse = await service.execute(request);
            expect(response.message).toBe('Este proveedor no existe');
        });

        test('find many registry', async () => {
            const service: SearchProviderService = new SearchProviderService(unitOfWork);
            const response: SearchProviderResponse = await service.execute(new SearchProviderRequest());
            expect(response.providers.length).toBe(1);
        });

        test('correct update provider', async ()=>{

            await new RegisterProviderService(unitOfWork).execute(
              new RegisterProviderRequest(
                'Company Example',
                'sellerOne@email',
                '1065',
                'Name Example',
                'Street example',
                'phone example'
              )
            );

            const service = new UpdateProviderService(unitOfWork);
            const response: UpdateProviderResponse = await service.execute(
              new UpdateProviderRequest(
                '1065',
                'Street example update',
                'phone example update',
                'update@email',
                'Company Example'
              )
            );
            expect(response.message).toBe('Proveedor actualizado correctamente')
        });

        test('update provider only telephone', async ()=>{

            await new RegisterProviderService(unitOfWork).execute(
              new RegisterProviderRequest(
                'Company Example',
                'sellerOne@email',
                '1065',
                'Name Example',
                'Street example',
                'phone example'
              )
            );

            const service = new UpdateProviderService(unitOfWork);
            const response: UpdateProviderResponse = await service.execute(
              new UpdateProviderRequest(
                '1065',
                undefined,
                'phone example update',
                undefined,
                undefined
              )
            );
            expect(response.message).toBe('Proveedor actualizado correctamente')
        });

    });

    describe('product test', () => {

        test('correct registry', async () => {
            await new RegisterProviderService(unitOfWork).execute(
                new RegisterProviderRequest(
                    'Company Example',
                    'sellerOne@email',
                    '1065',
                    'Name Example',
                    'Street example',
                    'phone example'
                )
            );

            await new RegisterBrandService(unitOfWork).execute(
                new RegisterBrandRequest(
                    '1111',
                    'Example Brand'
                )
            );

            await new RegisterCategoryService(unitOfWork).execute(
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
                    5000,
                    'Description Example'
                )
            );


            expect(response.message).toBe('Producto registrado con exito');
        });

        test('duplicate registry', async () => {
            await new RegisterProviderService(unitOfWork).execute(
              new RegisterProviderRequest(
                'Company Example',
                'sellerOne@email',
                '1065',
                'Name Example',
                'Street example',
                'phone example'
              )
            );

            await new RegisterBrandService(unitOfWork).execute(
              new RegisterBrandRequest(
                '1111',
                'Example Brand'
              )
            );

            await new RegisterCategoryService(unitOfWork).execute(
              new RegisterCategoryRequest(
                '1111',
                'Example Category'
              )
            );

            const service: RegisterProductService = new RegisterProductService(unitOfWork);

            await service.execute(
              new RegisterProductRequest(
                '8563',
                '1111',
                '1111',
                'Product Name Example',
                5000,
                'Description Example'
              )
            );

            const response: RegisterProductResponse = await service.execute(
                new RegisterProductRequest(
                    '8563',
                    '1111',
                    '1111',
                    'Product Name Example',
                    5000,
                    'Description Example',
                    0,
                    7000
                )
            );

            expect(response.message).toBe('Este producto ya se encuentra registrado');
        });

        test('find one registry', async () => {

            const service: SearchProductService = new SearchProductService(unitOfWork);
            const request = new SearchProductRequest('8563');
            const response: SearchProductResponse = await service.execute(request);
            expect(response.product.reference).toBe('8563');
        });

        test('find a non-existent registry', async () => {

            const service: SearchProductService = new SearchProductService(unitOfWork);
            const request = new SearchProductRequest('8547');
            const response: SearchProductResponse = await service.execute(request);
            expect(response.message).toBe('Este producto no existe');
        });

        test('find many registry', async () => {
            const service: SearchProductService = new SearchProductService(unitOfWork);
            const response: SearchProductResponse = await service.execute(new SearchProductRequest());
            expect(response.products.length).toBe(1);
        });

        test('correct update product', async () => {

            await new RegisterProductService(unitOfWork).execute(
                new RegisterProductRequest(
                    '8563',
                    '1111',
                    '1111',
                    'Product Name Example',
                    5000,
                    'Description Example',
                    0,
                    7000
                )
            );

            const service = new UpdateProductService(unitOfWork);
            const response: UpdateProductResponse = await service.execute(
                new UpdateProductRequest(
                    '8563',
                    8500,
                    6000,
                    '1111',
                    'Example product updated'
                )
            );
            expect(response.message).toBe('Producto actualizado correctamente');
        });

        test('update only price', async () => {

            await new RegisterProductService(unitOfWork).execute(
                new RegisterProductRequest(
                    '8563',
                    '1111',
                    '1111',
                    'Product Name Example',
                    5000,
                    'Description Example',
                    0,
                    7000
                )
            );

            const service = new UpdateProductService(unitOfWork);
            const response: UpdateProductResponse = await service.execute(
                new UpdateProductRequest(
                    '8563',
                    10000,
                    undefined,
                    undefined,
                    undefined
                )
            );
            expect(response.message).toBe('Producto actualizado correctamente');
        });

    })

    describe('product transaction test', () => {

        test('correct input', async () => {
            await new RegisterProviderService(unitOfWork).execute(
                new RegisterProviderRequest(
                    'Company Example',
                    'sellerOne@email',
                    '1065',
                    'Name Example',
                    'Street example',
                    'phone example'
                )
            );

            await new RegisterBrandService(unitOfWork).execute(
                new RegisterBrandRequest(
                    '1111',
                    'Example Brand'
                )
            );

            await new RegisterCategoryService(unitOfWork).execute(
                new RegisterCategoryRequest(
                    '1111',
                    'Example Category'
                )
            );

            await new RegisterProductService(unitOfWork).execute(
                new RegisterProductRequest(
                    '8563',
                    '1111',
                    '1111',
                    'Product Name Example',
                    5000,
                    'Description Example',
                    0,
                    7500
                )
            );

            const response: RegisterProductInputResponse = await new RegisterProductInputService(unitOfWork).execute(
                new RegisterProductInputRequest(
                    5,
                    '8563',
                    'Example input'
                )
            );

            expect(response.newQuantity).toBe(5);
        });

        test('correct output', async () => {
            await new RegisterProviderService(unitOfWork).execute(
                new RegisterProviderRequest(
                    'Company Example',
                    'sellerOne@email',
                    '1065',
                    'Name Example',
                    'Street example',
                    'phone example'
                )
            );

            await new RegisterBrandService(unitOfWork).execute(
                new RegisterBrandRequest(
                    '1111',
                    'Example Brand'
                )
            );

            await new RegisterCategoryService(unitOfWork).execute(
                new RegisterCategoryRequest(
                    '1111',
                    'Example Category'
                )
            );

            await new RegisterProductService(unitOfWork).execute(
                new RegisterProductRequest(
                    '8563',
                    '1111',
                    '1111',
                    'Product Name Example',
                    5000,
                    'Description Example',
                    0,
                    7500
                )
            );

            await new RegisterProductInputService(unitOfWork).execute(
                new RegisterProductInputRequest(
                    15,
                    '8563',
                    'Example input'
                )
            );

            const response: RegisterProductOutputResponse = await new RegisterProductOutputService(unitOfWork).execute(
                new RegisterProductOutputRequest(
                    7,
                    '8563',
                    'Example output'
                )
            );

            expect(response.newQuantity).toBe(13);
        });
    });

    describe('client tests', () => {

        test('correct registry', async () => {
            const service: RegisterClientService = new RegisterClientService(unitOfWork);
            const request = new RegisterClientRequest(
                'clientOne@email',
                '1066',
                'Name Example',
                'Street example',
                'phone example'
            );
            const response: RegisterClientResponse = await service.execute(request);
            expect(response.message).toBe('Cliente registrado satisfactoriamente');
        });

        test('duplicate registry', async () => {

            const service: RegisterClientService = new RegisterClientService(unitOfWork);
            const request = new RegisterClientRequest(
                'clientOne@email',
                '1066',
                'Name Example',
                'Street example',
                'phone example'
            );

            await service.execute(request);

            const response: RegisterClientResponse = await service.execute(request);
            expect(response.message).toBe('Este cliente ya se encuentra registrado');
        });

        test('find one registry', async () => {

            const service: SearchClientService = new SearchClientService(unitOfWork);
            const request = new SearchClientRequest('1066');
            const response: SearchClientResponse = await service.execute(request);
            expect(response.client.identification).toBe('1066');
        });

        test('find a non-existent registry', async () => {

            const service: SearchClientService = new SearchClientService(unitOfWork);
            const request = new SearchClientRequest('1065');
            const response: SearchClientResponse = await service.execute(request);
            expect(response.message).toBe('Este cliente no existe');
        });

        test('find many registry', async () => {
            const service: SearchClientService = new SearchClientService(unitOfWork);
            const response: SearchClientResponse = await service.execute(new SearchClientRequest());
            expect(response.clients.length).toBe(1);
        });

    });

    describe('user tests', () => {

        test('correct registry', async () => {
            await unitOfWork.complete(async () => await unitOfWork.userRepository.clear());
            const service: RegisterUserService = new RegisterUserService(unitOfWork);
            const request = new RegisterUserRequest(
                'adminOne@email',
                '1067',
                'Name Example',
                'Street example',
                'phone example',
                '12345',
                'admin'
            );
            const response: RegisterClientResponse = await service.execute(request);
            expect(response.message).toBe('Usuario registrado satisfactoriamente');
        });

        test('duplicate registry', async () => {

            await new RegisterUserService(unitOfWork).execute(
                new RegisterUserRequest(
                    'adminOne@email',
                    '1067',
                    'Name Example',
                    'Street example',
                    'phone example',
                    '12345',
                    'admin'
                )
            );

            const service: RegisterUserService = new RegisterUserService(unitOfWork);
            const request = new RegisterUserRequest(
                'adminOne@email',
                '1067',
                'Name Example',
                'Street example',
                'phone example',
                '12345',
                'admin'
            );
            const response: RegisterClientResponse = await service.execute(request);
            expect(response.message).toBe('Este usuario ya se encuentra registrado');
        });

        test('find one registry', async () => {

            const service: SearchUserService = new SearchUserService(unitOfWork);
            const request = new SearchUserRequest('1067');
            const response: SearchUserResponse = await service.execute(request);
            expect(response.user.identification).toBe('1067');
        });

        test('find a non-existent registry', async () => {

            const service: SearchUserService = new SearchUserService(unitOfWork);
            const request = new SearchUserRequest('1065');
            const response: SearchUserResponse = await service.execute(request);
            expect(response.message).toBe('Este usuario no existe');
        });

        test('find many registry', async () => {
            const service: SearchUserService = new SearchUserService(unitOfWork);
            const response: SearchUserResponse = await service.execute(new SearchClientRequest());
            expect(response.users.length).toBe(1);
        });

    });

    afterAll(() => {
        return unitOfWork.closeConnection();
    });

});