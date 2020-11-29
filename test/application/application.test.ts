import {IUnitOfWork} from '../../src/infrastructure/contracts/unitOfWork.interface';
import {UnitOfWork} from '../../src/infrastructure/unitOfWork/unitOfWork';
import {createConnection} from 'typeorm';
import {
    RegisterBrandRequest,
    RegisterBrandResponse,
    RegisterBrandService
} from '../../src/application/register.brand.service';
import {SearchBrandRequest, SearchBrandResponse, SearchBrandService} from '../../src/application/search.brand.service';
import {
    RegisterCategoryRequest,
    RegisterCategoryResponse,
    RegisterCategoryService
} from '../../src/application/register.category.service';
import {
    SearchCategoryRequest,
    SearchCategoryResponse,
    SearchCategoryService
} from '../../src/application/search.category.service';
import {
    RegisterProviderRequest,
    RegisterProviderResponse,
    RegisterProviderService
} from '../../src/application/register.provider.service';
import {
    SearchProviderRequest,
    SearchProviderResponse,
    SearchProviderService
} from '../../src/application/search.provider.service';
import {
    RegisterProductRequest,
    RegisterProductResponse,
    RegisterProductService
} from '../../src/application/register.product.service';
import {
    SearchProductRequest,
    SearchProductResponse,
    SearchProductService,
} from '../../src/application/search.product.service';
import {
    RegisterProductInputRequest, RegisterProductInputResponse,
    RegisterProductInputService
} from '../../src/application/register.product.input.service';
import {
    RegisterProductOutputRequest,
    RegisterProductOutputResponse,
    RegisterProductOutputService
} from '../../src/application/register.product.output.service';
import {
    UpdateProductRequest,
    UpdateProductResponse,
    UpdateProductService
} from '../../src/application/update.product.service';
import {UpdateBrandRequest, UpdateBrandResponse, UpdateBrandService} from '../../src/application/update.brand.service';
import {
    UpdateCategoryRequest,
    UpdateCategoryResponse,
    UpdateCategoryService
} from '../../src/application/update.category.service';
import {
    UpdateProviderRequest,
    UpdateProviderResponse,
    UpdateProviderService
} from '../../src/application/update.provider.service';
import {
    RegisterClientRequest,
    RegisterClientResponse,
    RegisterClientService
} from '../../src/application/register.client.service';
import {
    SearchClientRequest,
    SearchClientResponse,
    SearchClientService
} from '../../src/application/search.client.service';
import {RegisterUserRequest, RegisterUserService} from '../../src/application/register.user.service';
import {SearchUserRequest, SearchUserResponse, SearchUserService} from '../../src/application/search.user.service';
import {User} from '../../src/domain/entity/user.entity';
import {LoginRequest, LoginService} from '../../src/application/login.service';
import {
    RegisterFinancialMovementRequest,
    RegisterFinancialMovementService,
} from '../../src/application/register.financial.movement.service';
import { RegisterSaleRequest, RegisterSaleService } from '../../src/application/register.sale.service';
import { Product } from '../../src/domain/entity/product.entity';


describe('Application tests', () => {

    let unitOfWork: IUnitOfWork;
    let user: User;

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

        const u = new User();

        u.identification = '1086';
        u.email = 'adminOne@email';
        u.name = 'Name Example';
        u.street = 'Street example';
        u.telephone = 'phone example';
        u.password = '1067';
        u.rol = 'admin';
        unitOfWork.start();
        await unitOfWork.complete(async () => await unitOfWork.userRepository.save(u));

        const response = await new LoginService(unitOfWork).execute(new LoginRequest('1086', '1067'));
        user = response.user;
    });


    describe('brand test', () => {

        test('correct registry', async () => {
            const service: RegisterBrandService = new RegisterBrandService(unitOfWork);
            const request = new RegisterBrandRequest(
                user.identification,
                user.token,
                '1111',
                'Example'
            );
            const response: RegisterBrandResponse = await service.execute(request);
            expect(response.message).toBe('Marca registrada con exito');
        });

        test('duplicate registry', async () => {
            const service: RegisterBrandService = new RegisterBrandService(unitOfWork);
            const request = new RegisterBrandRequest(
                user.identification,
                user.token,
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
                user.identification,
                user.token,
                '1111'
            );
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.brand.reference).toBe('1111');
        });

        test('find a non-existent registry', async () => {
            const service: SearchBrandService = new SearchBrandService(unitOfWork);
            const request = new SearchBrandRequest(
                user.identification,
                user.token,
              '1112'
            );
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.message).toBe('Esta marca no existe');
        });

        test('find many registry', async () => {
            const service: SearchBrandService = new SearchBrandService(unitOfWork);
            const request = new SearchBrandRequest(
                user.identification,
                user.token,
            );
            const response: SearchBrandResponse = await service.execute(request);
            expect(response.brands.length).toBe(1);
        });

        test( 'correct update brand', async ()=>{
            await new RegisterBrandService(unitOfWork).execute(
              new RegisterBrandRequest(
                  user.identification,
                  user.token,
                '1111',
                'Example'
              )
            );

            const service = new UpdateBrandService(unitOfWork);
            const response: UpdateBrandResponse = await service.execute(
              new UpdateBrandRequest(
                  user.identification,
                  user.token,
                '1111',
                'Example Update Brand'
              )
            );
           expect(response.message).toBe('Marca actualizada correctamente')
        });
    });

    describe('category tests', () => {

        beforeAll(async () => {
            const categories = await unitOfWork.categoryRepository.findAllCategories();
            if (categories.length > 0)
                await unitOfWork.categoryRepository.clear();
        })

        test('correct registry', async () => {
            const service: RegisterCategoryService = new RegisterCategoryService(unitOfWork);
            const request = new RegisterCategoryRequest(
                user.identification,
                user.token,
                '1111',
                'Example Category'
            );
            const response: RegisterCategoryResponse = await service.execute(request);
            expect(response.message).toBe('Categoria registrada con exito');
        });

        test('duplicate registry', async () => {
            const service: RegisterCategoryService = new RegisterCategoryService(unitOfWork);
            const request = new RegisterCategoryRequest(
                user.identification,
                user.token,
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
                user.identification,
                user.token,
                '1111'
            );
            const response: SearchCategoryResponse = await service.execute(request);
            expect(response.category.reference).toBe('1111');
        });

        test('find a non-existent registry', async () => {

            const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
            const request = new SearchCategoryRequest(
                user.identification,
                user.token,
              '1112'
            );
            const response: SearchCategoryResponse = await service.execute(request);
            expect(response.message).toBe('Esta categoria no existe');
        });

        test('find many registry', async () => {
            const service: SearchCategoryService = new SearchCategoryService(unitOfWork);
            const response: SearchCategoryResponse = await service.execute(new SearchCategoryRequest(
                user.identification,
                user.token,
            ));
            expect(response.categories.length).toBe(1);
        });

        test('correct update category', async () => {
            await new RegisterCategoryService(unitOfWork).execute(
              new RegisterCategoryRequest(
                  user.identification,
                  user.token,
                  '1111',
                  'Example Category'
              )
            );

            const service = new UpdateCategoryService(unitOfWork);
            const response: UpdateCategoryResponse = await service.execute(
              new UpdateCategoryRequest(
                  user.identification,
                  user.token,
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
                user.identification,
                user.token,
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
                user.identification,
                user.token,
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
            const request = new SearchProviderRequest(
                user.identification,
                user.token,
                '1065');
            const response: SearchProviderResponse = await service.execute(request);
            expect(response.provider.identification).toBe('1065');
        });

        test('find a non-existent registry', async () => {

            const service: SearchProviderService = new SearchProviderService(unitOfWork);
            const request = new SearchProviderRequest(
                user.identification,
                user.token,
                '1066');
            const response: SearchProviderResponse = await service.execute(request);
            expect(response.message).toBe('Este proveedor no existe');
        });

        test('find many registry', async () => {
            const service: SearchProviderService = new SearchProviderService(unitOfWork);
            const response: SearchProviderResponse = await service.execute(new SearchProviderRequest(
                user.identification,
                user.token,
            ));
            expect(response.providers.length).toBe(1);
        });

        test('correct update provider', async ()=>{

            await new RegisterProviderService(unitOfWork).execute(
              new RegisterProviderRequest(
                  user.identification,
                  user.token,
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
                  user.identification,
                  user.token,
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
                  user.identification,
                  user.token,
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
                  user.identification,
                  user.token,
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
                    user.identification,
                    user.token,
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
                    user.identification,
                    user.token,
                    '1111',
                    'Example Brand'
                )
            );

            await new RegisterCategoryService(unitOfWork).execute(
                new RegisterCategoryRequest(
                    user.identification,
                    user.token,
                    '1111',
                    'Example Category'
                )
            );

            const service: RegisterProductService = new RegisterProductService(unitOfWork);

            const response: RegisterProductResponse = await service.execute(
                new RegisterProductRequest(
                    user.identification,
                    user.token,
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

            await new RegisterBrandService(unitOfWork).execute(
              new RegisterBrandRequest(
                  user.identification,
                  user.token,
                '1111',
                'Example Brand'
              )
            );

            await new RegisterCategoryService(unitOfWork).execute(
              new RegisterCategoryRequest(
                  user.identification,
                  user.token,
                '1111',
                'Example Category'
              )
            );

            const service: RegisterProductService = new RegisterProductService(unitOfWork);

            await service.execute(
              new RegisterProductRequest(
                  user.identification,
                  user.token,
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
                    user.identification,
                    user.token,
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
            const request = new SearchProductRequest(
                user.identification,
                user.token,
                '8563');
            const response: SearchProductResponse = await service.execute(request);
            expect(response.product.reference).toBe('8563');
        });

        test('find a non-existent registry', async () => {

            const service: SearchProductService = new SearchProductService(unitOfWork);
            const request = new SearchProductRequest(
                user.identification,
                user.token,
                '8547');
            const response: SearchProductResponse = await service.execute(request);
            expect(response.message).toBe('Este producto no existe');
        });

        test('find many registry', async () => {
            const service: SearchProductService = new SearchProductService(unitOfWork);
            const response: SearchProductResponse = await service.execute(new SearchProductRequest(
                user.identification,
                user.token
            ));
            expect(response.products.length).toBe(1);
        });

        test('correct update product', async () => {

            await new RegisterProductService(unitOfWork).execute(
                new RegisterProductRequest(
                    user.identification,
                    user.token,
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
                    user.identification,
                    user.token,
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
                    user.identification,
                    user.token,
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
                    user.identification,
                    user.token,
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

            await new RegisterBrandService(unitOfWork).execute(
                new RegisterBrandRequest(
                    user.identification,
                    user.token,
                    '1111',
                    'Example Brand'
                )
            );

            await new RegisterCategoryService(unitOfWork).execute(
                new RegisterCategoryRequest(
                    user.identification,
                    user.token,
                    '1111',
                    'Example Category'
                )
            );

            await new RegisterProductService(unitOfWork).execute(
                new RegisterProductRequest(
                    user.identification,
                    user.token,
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
                    user.identification,
                    user.token,
                    5,
                    '8563',
                    'Example input'
                )
            );

            expect(response.newQuantity).toBe(5);
        });

        test('correct output', async () => {

            await new RegisterBrandService(unitOfWork).execute(
                new RegisterBrandRequest(
                    user.identification,
                    user.token,
                    '1111',
                    'Example Brand'
                )
            );

            await new RegisterCategoryService(unitOfWork).execute(
                new RegisterCategoryRequest(
                    user.identification,
                    user.token,
                    '1111',
                    'Example Category'
                )
            );

            await new RegisterProductService(unitOfWork).execute(
                new RegisterProductRequest(
                    user.identification,
                    user.token,
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
                    user.identification,
                    user.token,
                    15,
                    '8563',
                    'Example input'
                )
            );

            const response: RegisterProductOutputResponse = await new RegisterProductOutputService(unitOfWork).execute(
                new RegisterProductOutputRequest(
                  true,
                    user.identification,
                    user.token,
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
                user.identification,
                user.token,
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
                user.identification,
                user.token,
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
            const request = new SearchClientRequest(
                user.identification,
                user.token,
                '1066');
            const response: SearchClientResponse = await service.execute(request);
            expect(response.client.identification).toBe('1066');
        });

        test('find a non-existent registry', async () => {

            const service: SearchClientService = new SearchClientService(unitOfWork);
            const request = new SearchClientRequest(
                user.identification,
                user.token,
                '1065');
            const response: SearchClientResponse = await service.execute(request);
            expect(response.message).toBe('Este cliente no existe');
        });

        test('find many registry', async () => {
            const service: SearchClientService = new SearchClientService(unitOfWork);
            const response: SearchClientResponse = await service.execute(new SearchClientRequest(
                user.identification,
                user.token
            ));
            expect(response.clients.length).toBe(1);
        });

    });

    describe('user tests', () => {

        test('correct registry', async () => {
            const service: RegisterUserService = new RegisterUserService(unitOfWork);
            const request = new RegisterUserRequest(
                user.identification,
                user.token,
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
                    user.identification,
                    user.token,
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
                user.identification,
                user.token,
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
            const request = new SearchUserRequest(
                user.identification,
                user.token,
                '1067');
            const response: SearchUserResponse = await service.execute(request);
            expect(response.user.identification).toBe('1067');
        });

        test('find a non-existent registry', async () => {

            const service: SearchUserService = new SearchUserService(unitOfWork);
            const request = new SearchUserRequest(
                user.identification,
                user.token,
                '1065');
            const response: SearchUserResponse = await service.execute(request);
            expect(response.message).toBe('Este usuario no existe');
        });

        test('find many registry', async () => {
            const service: SearchUserService = new SearchUserService(unitOfWork);
            const response: SearchUserResponse = await service.execute(new SearchClientRequest(
                user.identification,
                user.token,
            ));
            expect(response.users.length).toBe(2);
        });

    });

    describe('financial movements tests', () => {
        test('correct entry', async () => {
            const service: RegisterFinancialMovementService = new RegisterFinancialMovementService(unitOfWork);
            const response = await service.execute(
              new RegisterFinancialMovementRequest(
                50000,
                'reason example',
                0,
                user.identification,
                user.token,
              )
            );
            expect(response.message).toBe('Movimiento registrado con exito');
        });

        test('correct spending', async () => {
            const service: RegisterFinancialMovementService = new RegisterFinancialMovementService(unitOfWork);
            const response = await service.execute(
              new RegisterFinancialMovementRequest(
                0,
                'reason example',
                5000,
                user.identification,
                user.token,
              )
            );
            expect(response.message).toBe('Movimiento registrado con exito');
        });
    });

    describe('sales tests', () => {
        test('correct sale', async () => {

            await new RegisterBrandService(unitOfWork).execute(
              new RegisterBrandRequest(
                user.identification,
                user.token,
                '1111',
                'Example Brand'
              )
            );

            await new RegisterCategoryService(unitOfWork).execute(
              new RegisterCategoryRequest(
                user.identification,
                user.token,
                '1111',
                'Example Category'
              )
            );

            await new RegisterProductService(unitOfWork).execute(
              new RegisterProductRequest(
                user.identification,
                user.token,
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
                user.identification,
                user.token,
                15,
                '8563',
                'Example input'
              )
            );

            const product = new Product();
            product.reference = '8563';
            product.name = 'Product Name Example';
            product.description = 'Description Example';
            product.quantity = 4;
            product.price = 7500;

            const products = [
                product
            ]

            const service: RegisterSaleService = new RegisterSaleService(unitOfWork);
            const response = await service.execute(new RegisterSaleRequest(
              user.identification,
              user.token,
              '1066',
              products
            ));

            expect(response.value).toBe(7500*4);
        });
    });

    afterAll(() => {
        return unitOfWork.closeConnection();
    });

});
