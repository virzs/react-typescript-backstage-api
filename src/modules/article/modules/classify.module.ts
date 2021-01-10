import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleClassifyController } from '../controllers/classify.controller';
import { ArticleClassifyService } from '../services/classify.service';
import { Article_Classify } from '../entities/classify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article_Classify])],
  controllers: [ArticleClassifyController],
  providers: [ArticleClassifyService],
  exports: [ArticleClassifyService],
})
export class ClassifyModule {}
