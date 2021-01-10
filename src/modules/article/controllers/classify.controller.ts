import { Result } from 'src/common/interface/result.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../../auth/guards/jwtAuth.guard';
import { ArticleClassifyService } from '../services/classify.service';
import {
  addClassifyDTO,
  editClassifyDTO,
  getClassifyListDTO,
  getClassifyPageDTO,
} from '../dtos/classify.dto';

@ApiTags('文章分类')
@Controller('article/classify')
export class ArticleClassifyController {
  constructor(private readonly ClassifyService: ArticleClassifyService) {}
  @Post('add')
  @ApiOperation({ summary: '新增文章分类' })
  @UseGuards(JwtAuthGuard)
  addClassify(@Body() body: addClassifyDTO): Promise<Result> {
    return this.ClassifyService.addClassify(body);
  }

  @Put('edit')
  @ApiOperation({ summary: '编辑文章分类' })
  @UseGuards(JwtAuthGuard)
  editClassify(@Body() body: editClassifyDTO): Promise<Result> {
    return this.ClassifyService.editClassify(body);
  }

  @Get('tree-list')
  @ApiOperation({ summary: '获取树形列表' })
  @UseGuards(JwtAuthGuard)
  getTreeList(): Promise<Result> {
    return this.ClassifyService.getTreeList();
  }

  @Get('tree-page')
  @ApiOperation({ summary: '获取分类分页' })
  @UseGuards(JwtAuthGuard)
  getTreePage(@Request() req: getClassifyPageDTO): Promise<Result> {
    return this.ClassifyService.getTreePage(req);
  }

  @Get('list')
  @ApiOperation({ summary: '获取分类列表' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  getList(@Request() req: getClassifyListDTO): Promise<Result> {
    return this.ClassifyService.getList(req);
  }
}
