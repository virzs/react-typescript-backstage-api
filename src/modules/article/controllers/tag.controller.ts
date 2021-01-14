import { addTagDTO } from './../dtos/tag.dto';
import { Result } from 'src/common/interface/result.interface';
import { ArticleTagService } from './../services/tag.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/modules/auth/guards/jwtAuth.guard';

@ApiTags('文章标签')
@Controller('article/tag')
export class ArticleTagController {
  constructor(private readonly TagService: ArticleTagService) {}
  @Post('add')
  @ApiOperation({ summary: '新增标签' })
  @UseGuards(JwtAuthGuard)
  addTag(@Body() body: addTagDTO): Promise<Result> {
    return this.TagService.addTag(body);
  }
}
