import {Module} from "@nestjs/common";
import {InfrastructureModule} from "../infrastructure/infrastructure.module";
import {Brand} from "../domain/entity/brand.entity";
import {RegisterBrandService} from "./register.brand.service";
import {RegisterCategoryService} from "./register.category.service";

@Module({
    imports: [
        Brand,
        InfrastructureModule,
        RegisterBrandService,
        RegisterCategoryService
    ],
    exports:[
        RegisterBrandService,
        RegisterCategoryService
    ]
})
export class ApplicationModule{}