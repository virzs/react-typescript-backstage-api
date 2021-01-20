import {
  createMenuDTO,
  updateMenuDTO,
  deleteMenuDTO,
  detailMenuDTO,
} from './../dtos/menu.dto';
import { Result } from 'src/common/interface/result.interface';
import JwtAuthGuard from 'src/modules/auth/guards/jwtAuth.guard';
import { MenuService } from './../services/menu.service';
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

@ApiTags('菜单管理')
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create')
  @ApiOperation({ summary: '新增菜单' })
  @UseGuards(JwtAuthGuard)
  create(@Body() body: createMenuDTO): Promise<Result> {
    return this.menuService.create(body);
  }

  @Put('update')
  @ApiOperation({ summary: '编辑菜单' })
  @UseGuards(JwtAuthGuard)
  update(@Body() body: updateMenuDTO): Promise<Result> {
    return this.menuService.update(body);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除菜单' })
  @UseGuards(JwtAuthGuard)
  delete(@Body() body: deleteMenuDTO): Promise<Result> {
    return this.menuService.delete(body);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取菜单详情' })
  @UseGuards(JwtAuthGuard)
  detail(@Query() query: detailMenuDTO): Promise<Result> {
    return this.menuService.detial(query);
  }

  @Get('tree-list')
  @ApiOperation({ summary: '树形菜单列表' })
  @UseGuards(JwtAuthGuard)
  treeList(): Promise<Result> {
    return this.menuService.treeList();
  }
}
