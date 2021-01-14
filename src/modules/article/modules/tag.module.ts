import { ArticleTagService } from './../services/tag.service';
import { Article_Tag } from './../entities/tag.entity';
import { ArticleTagController } from './../controllers/tag.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Article_Tag])],
  controllers: [ArticleTagController],
  providers: [ArticleTagService],
  exports: [ArticleTagService],
})
export class TagModule {}
