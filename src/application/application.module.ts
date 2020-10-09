import {Module} from "@nestjs/common";
import {InfrastructureModule} from "../infrastructure/infrastructure.module";
import {Brand} from "../domain/entity/brand.entity";
import {RegisterBrandService} from "./register.brand.service";
import {RegisterCategoryService} from "./register.category.service";
import {RegisterProviderService} from "./register.provider.service";
import {SearchBrandService} from "./search.brand.service";
import {SearchCategoryService} from "./search.category.service";

@Module({
    imports: [
        Brand,
        InfrastructureModule,
        RegisterBrandService,
        RegisterCategoryService,
        RegisterProviderService,
        SearchBrandService,
        SearchCategoryService
    ],
    exports:[
        RegisterBrandService,
        RegisterCategoryService,
        RegisterProviderService,
        SearchBrandService,
        SearchCategoryService
    ]
})
export class ApplicationModule{}