import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {BrandRepository} from "./repositories/brand.repository";
import {UnitOfWork} from "./unitOfWork/unitOfWork";
import {CategoryRepository} from "./repositories/category.repository";
import {ProviderRepository} from "./repositories/provider.repository";
import {ProductRepository} from "./repositories/product.repository";
import {ProductTransactionRepository} from "./repositories/product.transaction.repository";

@Module(
    {
        imports: [
            DatabaseModule
        ],
        providers: [
            UnitOfWork
        ],
        exports: [
            UnitOfWork
        ]
    }
)
export class InfrastructureModule{}