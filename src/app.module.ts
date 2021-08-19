import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoleDefinitionModule } from './module/role-definition/role-definition.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    RoleDefinitionModule,
  ],
})
export class AppModule {}
