import { Module } from '@nestjs/common';
import { providers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { DomainReader } from '@energyweb/iam-contracts';
import { DOMAIN_READER_PROVIDER_TOKEN } from './domain-reader.const';
import { DomainReaderProvider } from './domain-reader.provider';

@Module({
  providers: [
    {
      useFactory: (configService: ConfigService) => {
        const provider: providers.JsonRpcProvider =
          new providers.JsonRpcProvider(
            configService.get<string>(
              'voltaUrl',
              'https://volta-rpc.energyweb.org',
            ),
          );

        return new DomainReader({
          ensRegistryAddress: configService.get<string>('ensRegistryAddress'),
          provider,
        });
      },
      inject: [ConfigService],
      provide: DOMAIN_READER_PROVIDER_TOKEN,
    },
    DomainReaderProvider,
  ],
  exports: [DomainReaderProvider],
})
export class DomainReaderModule {}
