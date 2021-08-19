import { Injectable } from '@nestjs/common';
import { utils } from 'ethers';

@Injectable()
export class EthersUtilsService {
  public namehash(name: string): string {
    return utils.namehash(name);
  }
}
