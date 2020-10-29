import {Token} from "../../src/infrastructure/authentication/token";
import {IUnitOfWork} from "../../src/infrastructure/contracts/unitOfWork.interface";
import {UnitOfWork} from "../../src/infrastructure/unitOfWork/unitOfWork";
import {createConnection} from "typeorm";
import {LoginRequest, LoginResponse, LoginService} from "../../src/application/login.service";
import {RegisterUserRequest, RegisterUserService} from "../../src/application/register.user.service";


describe('authentication test', () => {

    let unitOfWork: IUnitOfWork;

    beforeAll(async ()=>{
        unitOfWork = new UnitOfWork(await createConnection({
            type: 'mongodb',
            url: 'mongodb+srv://olson:1981@cluster0.fhagr.mongodb.net/memory?retryWrites=true&w=majority',
            logging: true,
            useNewUrlParser: true,
            synchronize: true,
            entities: ['src/infrastructure/database/entity/*.ts']
        }));
    });

    test('correct registry', async () => {

        const tokenGenerator = new Token();
        const token = tokenGenerator.generateToken();
        console.log(token);
        expect(token.length).toBe(40);
    });

    test('login correct', async () => {

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

        const service: LoginService = new LoginService(unitOfWork);
        const response: LoginResponse = await service.execute(
            new LoginRequest(
                '1067',
                '12345'
            )
        );
        expect(response.token.length).toBe(40);
    });
})