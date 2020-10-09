import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {BrandRepository} from "./repositories/brand.repository";
import {UnitOfWork} from "./unitOfWork/unitOfWork";
import {CategoryRepository} from "./repositories/category.repository";
import {ProviderRepository} from "./repositories/provider.repository";

@Module(
    {
        imports: [DatabaseModule],
        providers: [
            BrandRepository,
            CategoryRepository,
            ProviderRepository,
            UnitOfWork
        ],
        exports: [
            BrandRepository,
            CategoryRepository,
            ProviderRepository,
            UnitOfWork
        ]
    }
)
export class InfrastructureModule{}