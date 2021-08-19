import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { RoleDefinitionService } from './role-definition.service';
import { GetRoleDefinitionDto } from './dto/get-role-definition.dto';
import { EnergyWebDomainDefinitions } from '../domain-reader/domain-reader.util';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class RoleDefinitionController {
  constructor(
    protected readonly roleDefinitionService: RoleDefinitionService,
  ) {}

  /**
   * Cache interceptor takes care of whole caching.
   * In case of exception it does not save data to cache
   * Which in my opinion is good behavior as third party service may have some issues
   * Data is cached for 30 seconds
   */
  @Get(':roleNamespace')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @ApiResponse({ status: 200, description: 'Role definition has been found.' })
  @ApiResponse({ status: 404, description: 'Role definition not found' })
  public async getRoleDefinition(
    @Param() params: GetRoleDefinitionDto,
  ): Promise<EnergyWebDomainDefinitions> {
    try {
      const result: EnergyWebDomainDefinitions =
        await this.roleDefinitionService.getRoleDefinition(
          params.roleNamespace,
        );

      return result;
    } catch (e) {
      throw new NotFoundException(params.roleNamespace);
    }
  }
}
