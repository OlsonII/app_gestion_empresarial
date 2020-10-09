import {Module} from "@nestjs/common";
import {brandProviders, categoryProviders, providerProviders} from "./migrations/entities.provider";
import {databaseProviders} from "./provider/database.provider";

@Module(
    {
        providers: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders
        ],
        exports: [
            ...databaseProviders,
            ...brandProviders,
            ...categoryProviders,
            ...providerProviders
        ]
    }
)
export class DatabaseModule{}