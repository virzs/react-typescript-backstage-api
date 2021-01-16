import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('article/article')
export class ArticleController {}
