import { TagModule } from './modules/tag.module';
import { ClassifyModule } from './modules/classify.module';
import { Module } from '@nestjs/common';
/**
 *
 * 文章模块统一导出
 *
 */
@Module({
  imports: [ClassifyModule, TagModule],
})
export default class ArticleModule {}
