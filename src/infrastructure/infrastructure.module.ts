import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {BrandRepository} from "./repositories/brand.repository";
import {UnitOfWork} from "./unitOfWork/unitOfWork";
import {CategoryRepository} from "./repositories/category.repository";

@Module(
    {
        imports: [DatabaseModule],
        providers: [BrandRepository, CategoryRepository, UnitOfWork],
        exports: [BrandRepository, CategoryRepository, UnitOfWork]
    }
)
export class InfrastructureModule{}