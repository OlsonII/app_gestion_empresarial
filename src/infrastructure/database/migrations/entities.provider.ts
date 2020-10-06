import {Connection} from "typeorm";
import {BrandOrm} from "../entity/brand.orm";
import {CategoryOrm} from "../entity/category.orm";


export const brandProviders = [
    {
        provide: 'BRAND_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(BrandOrm),
        inject: ['DATABASE_CONNECTION'],
    }
];

export const categoryProviders = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(CategoryOrm),
        inject: ['DATABASE_CONNECTION'],
    }
];