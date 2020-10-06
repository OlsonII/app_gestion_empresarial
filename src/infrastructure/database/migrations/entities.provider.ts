import {Connection} from "typeorm";
import {BrandOrm} from "../entity/brand.orm";


export const brandProviders = [
    {
        provide: 'BRAND_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(BrandOrm),
        inject: ['DATABASE_CONNECTION'],
    }
];