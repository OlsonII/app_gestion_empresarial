import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {UnitOfWork} from "./unitOfWork/unitOfWork";
import {AuthenticationModule} from "./authentication/authentication.module";

@Module(
    {
        imports: [
            DatabaseModule,
            AuthenticationModule
        ],
        providers: [
            UnitOfWork
        ],
        exports: [
            UnitOfWork,
            AuthenticationModule
        ]
    }
)
export class InfrastructureModule{}