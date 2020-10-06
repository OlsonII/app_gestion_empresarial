import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {BrandRepository} from "./repositories/brand.repository";
import {UnitOfWork} from "./unitOfWork/unitOfWork";

@Module(
    {
        imports: [DatabaseModule],
        providers: [BrandRepository, UnitOfWork],
        exports: [BrandRepository, UnitOfWork]
    }
)
export class InfrastructureModule{}