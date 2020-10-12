import {Module} from "@nestjs/common";
import {
    brandProviders,
    categoryProviders,
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
            ...productTransactionProviders
        ],
        exports: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders,
            ...productTransactionProviders
        ]
    }
)
export class DatabaseModule{}