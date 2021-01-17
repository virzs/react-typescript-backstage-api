import { deleteClassifyDTO } from './../dtos/classify.dto';
import {
  addArticleDTO,
  detailArticleDTO,
  editArticleDTO,
  pageArticleDTO,
} from './../dtos/article.dto';
import { ArticleService } from './../services/article.service';
import { Result } from 'src/common/interface/result.interface';
import JwtAuthGuard from 'src/modules/auth/guards/jwtAuth.guard';
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

@ApiTags('文章')
@Controller('article/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('add')
  @ApiOperation({ summary: '新增文章' })
  @UseGuards(JwtAuthGuard)
  add(@Body() body: addArticleDTO): Promise<Result> {
    return this.articleService.add(body);
  }

  @Put('edit')
  @ApiOperation({ summary: '编辑文章' })
  @UseGuards(JwtAuthGuard)
  edit(@Body() body: editArticleDTO): Promise<Result> {
    return this.articleService.edit(body);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除文章' })
  @UseGuards(JwtAuthGuard)
  delete(@Body() body: deleteClassifyDTO): Promise<Result> {
    return this.articleService.delete(body);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取文章详情' })
  @UseGuards(JwtAuthGuard)
  detail(@Query() query: detailArticleDTO): Promise<Result> {
    return this.articleService.detail(query);
  }

  @Get('page')
  @ApiOperation({ summary: '文章分页' })
  @UseGuards(JwtAuthGuard)
  page(@Query() query: pageArticleDTO): Promise<Result> {
    return this.articleService.page(query);
  }
}
