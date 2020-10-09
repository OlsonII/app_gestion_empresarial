import {Connection} from "typeorm";
import {BrandOrm} from "../entity/brand.orm";
import {CategoryOrm} from "../entity/category.orm";
import {ProviderOrm} from "../entity/provider.orm";


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

export const providerProviders = [
    {
        provide: 'PROVIDER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ProviderOrm),
        inject: ['DATABASE_CONNECTION'],
    }
];