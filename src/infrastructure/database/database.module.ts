import {Module} from "@nestjs/common";
import {
    brandProviders,
    categoryProviders, clientProviders, financialMovementProviders, productProviders,
    productTransactionProviders,
    providerProviders, userProviders,
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
            ...financialMovementProviders
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
            ...financialMovementProviders
        ]
    }
)
export class DatabaseModule{}