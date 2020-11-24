import { Result } from 'src/common/interface/result.interface';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guard/jwtAuth.guard';
import { ArticleClassifyService } from './articleClassify.service';
import { addClassifyDTO } from './dto/addArticleClassify.dto';

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
}
