import {Connection} from "typeorm";
import {BrandOrm} from "../entity/brand.orm";
import {CategoryOrm} from "../entity/category.orm";
import {ProviderOrm} from "../entity/provider.orm";
import {ProductOrm} from "../entity/product.orm";


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

export const productProviders =[
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ProductOrm),
        inject: ['DATABASE_CONNECTION'],
    }
]

export const productTransactionProviders = [
    {
        provide: 'PRODUCT_TRANSACTION_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ProviderOrm),
        inject: ['DATABASE_CONNECTION'],
    }
];