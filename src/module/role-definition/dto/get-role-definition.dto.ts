import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRoleDefinitionDto {
  @ApiProperty()
  @IsNotEmpty()
  public roleNamespace: string;
}
