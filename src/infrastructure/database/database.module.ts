import {Module} from "@nestjs/common";
import {
    brandProviders,
    categoryProviders, clientProviders, financialMovementProviders, productProviders,
    productTransactionProviders,
    providerProviders, saleProviders, userProviders,
} from './migrations/entities.provider';
import {databaseProviders} from "./provider/database.provider";

@Module(
    {
        providers: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders,
            ...productProviders,
            ...productTransactionProviders,
            ...clientProviders,
            ...userProviders,
            ...financialMovementProviders,
            ...saleProviders
        ],
        exports: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders,
            ...productProviders,
            ...productTransactionProviders,
            ...clientProviders,
            ...userProviders,
            ...financialMovementProviders,
            ...saleProviders
        ]
    }
)
export class DatabaseModule{}