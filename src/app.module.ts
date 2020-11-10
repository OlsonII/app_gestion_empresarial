import { Module } from '@nestjs/common';
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {ApplicationModule} from "./application/application.module";
import {ControllersModule} from "./controller/controller.module";

@Module({
  imports: [
    ApplicationModule,
    InfrastructureModule,
    ControllersModule
  ],
})
export class AppModule {}
