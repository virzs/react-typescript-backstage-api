/**
 *
 * 文章模块统一导出
 *
 */
import { ClassifyModule } from './modules/classify.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ClassifyModule],
})
export default class ArticleModule {}
