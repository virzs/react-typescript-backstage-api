import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleClassifyController } from './articleClassify.controller';
import { ArticleClassifyService } from './articleClassify.service';
import { Article_Classify } from './entities/article_classify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article_Classify])],
  controllers: [ArticleClassifyController],
  providers: [ArticleClassifyService],
  exports: [ArticleClassifyService],
})
export class ArticleClassifyModule {}
