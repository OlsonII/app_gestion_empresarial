import { Module } from '@nestjs/common';
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {ApplicationModule} from "./application/application.module";

@Module({
  imports: [
      ApplicationModule,
      InfrastructureModule
  ],
})
export class AppModule {}
