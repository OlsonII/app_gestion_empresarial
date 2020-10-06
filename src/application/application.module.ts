import {Module} from "@nestjs/common";
import {InfrastructureModule} from "../infrastructure/infrastructure.module";
import {Brand} from "../domain/entity/brand.entity";
import {RegisterBrandService} from "./register.brand.service";

@Module({
    imports: [
        Brand,
        InfrastructureModule,
        RegisterBrandService
    ],
    exports:[RegisterBrandService]
})
export class ApplicationModule{}