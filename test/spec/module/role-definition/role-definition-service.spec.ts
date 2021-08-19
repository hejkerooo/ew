import { RoleDefinitionService } from '../../../../src/module/role-definition/role-definition.service';
import { DomainReaderProvider } from '../../../../src/module/domain-reader/domain-reader.provider';
import { DomainReader } from '@energyweb/iam-contracts';
import { EthersUtilsService } from '../../../../src/module/ethers-utils/ethers-utils.service';

const mockedDomainReader: Partial<DomainReader> = {
  read: jest.fn(),
};

const mockedDomainReaderProvider: DomainReaderProvider =
  new DomainReaderProvider(mockedDomainReader as DomainReader);

describe('RoleDefinitionService', () => {
  let roleDefinitionService: RoleDefinitionService;

  beforeEach(() => {
    jest.clearAllMocks();

    roleDefinitionService = new RoleDefinitionService(
      mockedDomainReaderProvider,
      new EthersUtilsService(),
    );
  });

  describe('getRoleDefinition', () => {
    it('should return role definition', async () => {
      const mockedResponse = {
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

      const mockedDomainReaderResponse = jest
        .spyOn(mockedDomainReader, 'read')
        .mockImplementation(async () => mockedResponse as any); // Somehow types and received objects are incompatible

      const role = await roleDefinitionService.getRoleDefinition('test-node');

      expect(role).toBe(mockedResponse);
      expect(mockedDomainReaderResponse).toBeCalledTimes(1);
    });
  });
});
