import { Inject, Injectable } from '@nestjs/common';
import { DOMAIN_READER_PROVIDER_TOKEN } from './domain-reader.const';
import { DomainReader } from '@energyweb/iam-contracts';
import { EnergyWebDomainDefinitions } from './domain-reader.util';

/**
 * Wrapper/provider for DomainReader from @energyweb/iam-contracts
 */
@Injectable()
export class DomainReaderProvider {
  constructor(
    @Inject(DOMAIN_READER_PROVIDER_TOKEN)
    protected readonly domainReader: DomainReader,
  ) {}

  public async read(node: string): Promise<EnergyWebDomainDefinitions> {
    return this.domainReader.read({
      node,
    });
  }
}
