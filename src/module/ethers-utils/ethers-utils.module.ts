import { Module } from '@nestjs/common';
import { EthersUtilsService } from './ethers-utils.service';

@Module({
  providers: [EthersUtilsService],
  exports: [EthersUtilsService],
})
export class EthersUtilsModule {}
