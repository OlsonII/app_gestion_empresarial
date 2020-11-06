import {createConnection} from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'mongodb',
            url: 'mongodb+srv://olson:1981@cluster0.fhagr.mongodb.net/production?retryWrites=true&w=majority',
            logging: true,
            synchronize: true,
            useNewUrlParser: true,
            ssl: true,
            entities: ['dist/infrastructure/database/entity/*.js']
        })
    }
]