import {
  addTagDTO,
  editTagDTO,
  deleteTagDTO,
  detailTagDTO,
} from './../dtos/tag.dto';
import { Result } from 'src/common/interface/result.interface';
import { ArticleTagService } from './../services/tag.service';
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

  @Put('edit')
  @ApiOperation({ summary: '编辑标签' })
  @UseGuards(JwtAuthGuard)
  editTag(@Body() body: editTagDTO): Promise<Result> {
    return this.TagService.editTag(body);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除标签' })
  @UseGuards(JwtAuthGuard)
  deleteTag(@Body() body: deleteTagDTO): Promise<Result> {
    return this.TagService.deleteTag(body);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取标签信息' })
  @UseGuards(JwtAuthGuard)
  detail(@Query() req: detailTagDTO): Promise<Result> {
    return this.TagService.detail(req);
  }
}
