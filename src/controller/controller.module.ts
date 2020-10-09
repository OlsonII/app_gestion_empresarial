import {Module} from "@nestjs/common";
import {ApplicationModule} from "../application/application.module";
import {InfrastructureModule} from "../infrastructure/infrastructure.module";
import {CategoryController} from "./category.controller";
import {BrandController} from "./brand.controller";
import {ProviderController} from "./provider.controller";

@Module({
    imports: [
        ApplicationModule,
        InfrastructureModule
    ],
    controllers: [
        CategoryController,
        BrandController,
        ProviderController
    ]
})
export class ControllersModule{}