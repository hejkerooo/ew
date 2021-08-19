import { CACHE_MANAGER, INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../src/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { DomainReader } from '@energyweb/iam-contracts';
import { DOMAIN_READER_PROVIDER_TOKEN } from '../../../../src/module/domain-reader/domain-reader.const';

const mockedDomainReader: Partial<DomainReader> = {
  read: jest.fn(),
};

const successfulResponse = {
  version: '1.0.0',
  issuer: {
    issuerType: 'DID',
    roleName: null,
    did: ['did:ethr:0x7032637E0Dd0756c95dCa77BA03cD0f4cDA19DFe'],
  },
  roleType: 'app',
  roleName: 'manufacturer',
  fields: [
    {
      fieldType: 'text',
      label: 'Company Name',
      validation: '',
    },
    {
      fieldType: 'text',
      label: 'Individual Name',
      validation: null,
    },
    {
      fieldType: 'text',
      label: 'Individual E-mail Address',
      validation: null,
    },
  ],
  metadata: {},
};

describe('RoleDefinitionController', () => {
  let app: INestApplication;
  let cache;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DOMAIN_READER_PROVIDER_TOKEN)
      .useValue(mockedDomainReader)
      .compile();

    app = moduleRef.createNestApplication();

    cache = moduleRef.get(CACHE_MANAGER);

    await app.init();
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    await cache.reset();
  });

  describe('/GET :roleNamespace', () => {
    it('Should return response', async () => {
      const spiedDomainReader = jest
        .spyOn(mockedDomainReader, 'read')
        .mockImplementation(async () => successfulResponse as any);

      const response = await request(app.getHttpServer())
        .get('/valid')
        .expect(200);

      expect(response.body).toStrictEqual(successfulResponse);
      expect(spiedDomainReader).toBeCalledTimes(1);

      const cacheHit = await cache.get('/valid');
      expect(cacheHit).toStrictEqual(successfulResponse);

      // should read directly from cache

      const secondResponseFromCache = await request(app.getHttpServer())
        .get('/valid')
        .expect(200);

      expect(secondResponseFromCache.body).toStrictEqual(successfulResponse);
      // By count one we know that we received response from cache
      // if this count would be 2 it would mean that we received it from API
      expect(spiedDomainReader).toBeCalledTimes(1);
    });

    it('Should throw 404 - role definition does not exist', async () => {
      const spiedDomainReader = jest
        .spyOn(mockedDomainReader, 'read')
        .mockImplementation(async () => {
          throw new Error();
        });

      const response = await request(app.getHttpServer())
        .get('/invalid')
        .expect(404);

      expect(response.body).toStrictEqual({
        statusCode: 404,
        message: 'invalid',
        error: 'Not Found',
      });

      expect(spiedDomainReader).toBeCalledTimes(1);

      const cacheHit = await cache.get('/invalid');
      expect(cacheHit).toBeNull();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
