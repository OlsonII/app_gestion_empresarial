import {Token} from "../../../app_gestion_empresarial/src/infrastructure/authentication/token";


describe('authentication test', () => {


    test('correct registry', async () => {

        const tokenGenerator = new Token();
        const token = tokenGenerator.generateToken();
        console.log(token);
        expect(token.length).toBe(128);
    });

})
