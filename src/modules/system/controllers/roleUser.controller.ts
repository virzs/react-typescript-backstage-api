import { RoleUserService } from './../services/roleUser.service';
import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/interface/result.interface';
import JwtAuthGuard from 'src/modules/auth/guards/jwtAuth.guard';
import { associatedUserDTO, associatedUserPageRoleDTO } from '../dtos/role.dto';

@ApiTags('角色关联用户')
@Controller('system/role/associate-user')
export class RoleUserController {
  constructor(private readonly roleUserService: RoleUserService) {}

  @Put('create')
  @ApiOperation({ description: '关联用户' })
  @UseGuards(JwtAuthGuard)
  associatedUser(@Body() body: associatedUserDTO): Promise<Result> {
    return this.roleUserService.associatedUser(body);
  }

  @Get('page')
  @ApiOperation({ summary: '角色关联的用户分页' })
  @UseGuards(JwtAuthGuard)
  associatedUserPage(
    @Query() query: associatedUserPageRoleDTO,
  ): Promise<Result> {
    return this.roleUserService.associatedUserPage(query);
  }
}
