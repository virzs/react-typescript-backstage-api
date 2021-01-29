import { Result } from './../../../common/interface/result.interface';
import { RoleUserService } from './../services/roleUser.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/modules/auth/guards/jwtAuth.guard';
import { associatedUserDTO, associatedUserPageRoleDTO } from '../dtos/role.dto';

@ApiTags('角色关联用户')
@Controller('system/role/associate-user')
export class RoleUserController {
  constructor(private readonly roleUserService: RoleUserService) {}

  @Post('create')
  @ApiOperation({ description: '角色关联用户' })
  @UseGuards(JwtAuthGuard)
  associatedUser(@Body() body: associatedUserDTO): Promise<Result> {
    return this.roleUserService.associatedUser(body);
  }

  @Put('update')
  @ApiOperation({ description: '更改用户关联角色' })
  @UseGuards(JwtAuthGuard)
  associatedChange(@Body() body): Promise<Result> {
    return this.roleUserService.associatedChange(body);
  }

  @Delete('delete')
  @ApiOperation({ description: '取消用户关联角色' })
  @UseGuards(JwtAuthGuard)
  associatedDelete(@Body() body): Promise<Result> {
    return this.roleUserService.associatedDelete(body);
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
