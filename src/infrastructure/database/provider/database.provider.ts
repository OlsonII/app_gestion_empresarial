import {createConnection} from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1981',
            database: 'FINANCIAL_MANAGEMENT',
            entities: ['dist/infrastructure/database/entity/*.js']
        })
    }
]