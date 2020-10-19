import {Module} from "@nestjs/common";
import {
    brandProviders,
    categoryProviders, productProviders,
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
            ...productTransactionProviders
        ],
        exports: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders,
            ...productProviders,
            ...productTransactionProviders
        ]
    }
)
export class DatabaseModule{}