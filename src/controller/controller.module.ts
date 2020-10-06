import {Module} from "@nestjs/common";
import {ApplicationModule} from "../application/application.module";
import {InfrastructureModule} from "../infrastructure/infrastructure.module";
import {CategoryController} from "./category.controller";
import {BrandController} from "./brand.controller";

@Module({
    imports: [
        ApplicationModule,
        InfrastructureModule
    ],
    controllers: [
        CategoryController,
        BrandController
    ]
})
export class ControllersModule{}