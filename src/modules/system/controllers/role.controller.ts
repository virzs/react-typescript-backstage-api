import {
  createRoleDTO,
  pageRoleDTO,
  associatedUserDTO,
  associatedUserPageRoleDTO,
} from './../dtos/role.dto';
import { Result } from 'src/common/interface/result.interface';
import JwtAuthGuard from 'src/modules/auth/guards/jwtAuth.guard';
import { RoleService } from './../services/role.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('角色管理')
@Controller('system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('create')
  @ApiOperation({ summary: '新增角色' })
  @UseGuards(JwtAuthGuard)
  create(@Body() body: createRoleDTO): Promise<Result> {
    return this.roleService.create(body);
  }

  @Put('associate/user')
  @ApiOperation({ description: '关联用户' })
  @UseGuards(JwtAuthGuard)
  associatedUser(@Body() body: associatedUserDTO): Promise<Result> {
    return this.roleService.associatedUser(body);
  }

  @Get('associate/user-page')
  @ApiOperation({ summary: '角色分页' })
  @UseGuards(JwtAuthGuard)
  associatedUserPage(
    @Query() query: associatedUserPageRoleDTO,
  ): Promise<Result> {
    return this.roleService.associatedUserPage(query);
  }

  @Get('page')
  @ApiOperation({ summary: '角色分页' })
  @UseGuards(JwtAuthGuard)
  page(@Query() query: pageRoleDTO): Promise<Result> {
    return this.roleService.page(query);
  }
}
