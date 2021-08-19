import * as env from 'env-var';
import * as dotenv from 'dotenv';
import { VOLTA_ENS_REGISTRY_ADDRESS } from '@energyweb/iam-contracts';

dotenv.config();

export default () => ({
  redis: {
    port: env.get('REDIS_PORT').default(6379).example('6379').asPortNumber(),
    host: env
      .get('REDIS_HOST')
      .default('localhost')
      .example('localhost')
      .asString(),
  },
  voltaUrl: env
    .get('VOLTA_URL')
    .default('https://volta-rpc.energyweb.org')
    .asUrlString(),
  ensRegistryAddress: env
    .get('ENS_REGISTRY_ADDRESS')
    .default(VOLTA_ENS_REGISTRY_ADDRESS)
    .example(VOLTA_ENS_REGISTRY_ADDRESS)
    .asString(),
  port: env.get('PORT').default(3000).example('3000').asPortNumber(),
});
