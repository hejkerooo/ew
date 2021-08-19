import { CacheModule, Module } from '@nestjs/common';
import { DomainReaderModule } from '../domain-reader/domain-reader.module';
import { RoleDefinitionService } from './role-definition.service';
import { RoleDefinitionController } from './role-definition.controller';
import { EthersUtilsModule } from '../ethers-utils/ethers-utils.module';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    DomainReaderModule,
    EthersUtilsModule,
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RoleDefinitionService],
  controllers: [RoleDefinitionController],
})
export class RoleDefinitionModule {}
