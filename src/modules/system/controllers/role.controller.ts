import { RoleUserService } from './../services/roleUser.service';
import {
  createRoleDTO,
  pageRoleDTO,
  updateRoleDTO,
  deleteRoleDTO,
  detailRoleDTO,
} from './../dtos/role.dto';
import { Result } from 'src/common/interface/result.interface';
import JwtAuthGuard from 'src/modules/auth/guards/jwtAuth.guard';
import { RoleService } from './../services/role.service';
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

@ApiTags('角色管理')
@Controller('system/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleUserService: RoleUserService,
  ) {}
  @Post('create')
  @ApiOperation({ summary: '新增角色' })
  @UseGuards(JwtAuthGuard)
  create(@Body() body: createRoleDTO): Promise<Result> {
    return this.roleService.create(body);
  }

  @Put('update')
  @ApiOperation({ summary: '编辑角色' })
  @UseGuards(JwtAuthGuard)
  update(@Body() body: updateRoleDTO): Promise<Result> {
    return this.roleService.update(body);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除角色' })
  @UseGuards(JwtAuthGuard)
  delete(@Body() body: deleteRoleDTO): Promise<Result> {
    return this.roleService.delete(body);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取角色详情' })
  @UseGuards(JwtAuthGuard)
  detail(@Query() query: detailRoleDTO): Promise<Result> {
    return this.roleService.detail(query);
  }

  @Get('page')
  @ApiOperation({ summary: '角色分页' })
  @UseGuards(JwtAuthGuard)
  page(@Query() query: pageRoleDTO): Promise<Result> {
    return this.roleService.page(query);
  }

  @Get('list')
  @ApiOperation({ description: '角色列表' })
  @UseGuards(JwtAuthGuard)
  list(): Promise<Result> {
    return this.roleService.list();
  }
}
