import {
  IAppDefinition,
  IOrganizationDefinition,
  IRoleDefinition,
} from '@energyweb/iam-contracts/dist/src/types/DomainDefinitions';

export type EnergyWebDomainDefinitions =
  | IRoleDefinition
  | IAppDefinition
  | IOrganizationDefinition;
