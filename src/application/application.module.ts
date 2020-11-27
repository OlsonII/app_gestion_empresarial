import {Module} from "@nestjs/common";
import {InfrastructureModule} from "../infrastructure/infrastructure.module";
import {RegisterBrandService} from "./register.brand.service";
import {RegisterCategoryService} from "./register.category.service";
import {RegisterProviderService} from "./register.provider.service";
import {SearchBrandService} from "./search.brand.service";
import {SearchCategoryService} from "./search.category.service";
import {SearchProviderService} from './search.provider.service';
import {RegisterProductService} from "./register.product.service";
import {RegisterProductInputService} from "./register.product.input.service";
import {RegisterProductOutputService} from "./register.product.output.service";
import {SearchProductService} from "./search.product.service";
import {UpdateProductService} from "./update.product.service";
import {UpdateBrandService} from './update.brand.service';
import {RegisterClientService} from "./register.client.service";
import {RegisterUserService} from "./register.user.service";
import {SearchUserService} from "./search.user.service";
import {UpdateCategoryService} from "./update.category.service";
import {UpdateProviderService} from "./update.provider.service";
import {LoginService} from "./login.service";
import {UpdateUserService} from "./update.user.service";
import {UpdateClientService} from "./update.client.service";
import {SearchProductTransactionService} from "./search.product.transaction.service";
import { RegisterFinancialMovementService } from './register.financial.movement.service';
import { RegisterSaleService } from './register.sale.service';

@Module({
    imports: [
        InfrastructureModule,
        RegisterBrandService,
        RegisterCategoryService,
        RegisterProviderService,
        RegisterProductService,
        RegisterProductInputService,
        RegisterProductOutputService,
        RegisterClientService,
        RegisterUserService,
        RegisterFinancialMovementService,
        RegisterSaleService,
        SearchBrandService,
        SearchCategoryService,
        SearchProviderService,
        SearchProductService,
        SearchUserService,
        SearchProductTransactionService,
        UpdateProductService,
        UpdateCategoryService,
        UpdateBrandService,
        UpdateProviderService,
        UpdateClientService,
        UpdateUserService,
        LoginService
    ],
    exports:[
        InfrastructureModule,
        RegisterBrandService,
        RegisterCategoryService,
        RegisterProviderService,
        RegisterProductService,
        RegisterProductInputService,
        RegisterProductOutputService,
        RegisterClientService,
        RegisterUserService,
        RegisterFinancialMovementService,
        RegisterSaleService,
        SearchBrandService,
        SearchCategoryService,
        SearchProviderService,
        SearchProductService,
        SearchUserService,
        SearchProductTransactionService,
        UpdateProductService,
        UpdateCategoryService,
        UpdateBrandService,
        UpdateProviderService,
        UpdateClientService,
        UpdateUserService,
        LoginService
    ]
})
export class ApplicationModule{}