import {Module} from "@nestjs/common";
import {brandProviders, categoryProviders} from "./migrations/entities.provider";

@Module(
    {
        providers: [
            ...brandProviders,
            ...categoryProviders
        ],
        exports: [
            ...brandProviders,
            ...categoryProviders
        ]
    }
)
export class DatabaseModule{}