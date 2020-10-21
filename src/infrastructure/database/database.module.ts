import {Module} from "@nestjs/common";
import {
    brandProviders,
    categoryProviders, clientProviders, productProviders,
    productTransactionProviders,
    providerProviders, userProviders
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
            ...clientProviders,
            ...userProviders
        ],
        exports: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders,
            ...productProviders,
            ...productTransactionProviders,
            ...clientProviders,
            ...userProviders
        ]
    }
)
export class DatabaseModule{}