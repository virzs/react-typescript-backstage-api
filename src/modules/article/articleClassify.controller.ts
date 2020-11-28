import { Result } from 'src/common/interface/result.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guard/jwtAuth.guard';
import { ArticleClassifyService } from './articleClassify.service';
import { addClassifyDTO } from './dto/addArticleClassify.dto';
import { getListDTO } from './dto/getList.dto';

@ApiTags('文章分类')
@Controller('article/classify')
export class ArticleClassifyController {
  constructor(private readonly ClassifyService: ArticleClassifyService) {}
  @Post('add')
  @ApiOperation({ summary: '新增文章分类' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  addClassify(@Body() body: addClassifyDTO): Promise<Result> {
    return this.ClassifyService.addClassify(body);
  }

  @Get('tree-list')
  @ApiOperation({ summary: '获取树形列表' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  getTreeList(): Promise<Result> {
    return this.ClassifyService.getTreeList();
  }

  @Get('list')
  @ApiOperation({ summary: '获取分类列表' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  getList(@Request() req: getListDTO): Promise<Result> {
    return this.ClassifyService.getList(req);
  }
}
