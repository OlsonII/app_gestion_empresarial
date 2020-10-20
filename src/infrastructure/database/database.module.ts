import {Module} from "@nestjs/common";
import {
    brandProviders,
    categoryProviders, clientProviders, productProviders,
    productTransactionProviders,
    providerProviders
} from "./migrations/entities.provider";
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
            ...clientProviders
        ],
        exports: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders,
            ...productProviders,
            ...productTransactionProviders,
            ...clientProviders
        ]
    }
)
export class DatabaseModule{}