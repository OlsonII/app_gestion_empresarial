import {Module} from "@nestjs/common";
import {brandProviders} from "./migrations/entities.provider";

@Module(
    {
        providers: [
            ...brandProviders
        ],
        exports: [
            ...brandProviders
        ]
    }
)
export class DatabaseModule{}