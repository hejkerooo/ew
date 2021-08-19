import { Injectable } from '@nestjs/common';
import { DomainReaderProvider } from '../domain-reader/domain-reader.provider';
import { EthersUtilsService } from '../ethers-utils/ethers-utils.service';
import { EnergyWebDomainDefinitions } from '../domain-reader/domain-reader.util';

@Injectable()
export class RoleDefinitionService {
  constructor(
    protected readonly domainReaderProvider: DomainReaderProvider,
    protected readonly ethersUtilsService: EthersUtilsService,
  ) {}

  public async getRoleDefinition(
    node: string,
  ): Promise<EnergyWebDomainDefinitions> {
    return this.domainReaderProvider.read(
      this.ethersUtilsService.namehash(node),
    );
  }
}
