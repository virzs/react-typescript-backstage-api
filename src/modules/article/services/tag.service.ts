import { Article_Tag } from './../entities/tag.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectRepository(Article_Tag)
    private readonly TagRepository: Repository<Article_Tag>,
  ) {}
  async addTag(body) {
    const result = await this.TagRepository.insert(body);
    if (!result) throw new BadRequestException('添加失败');
    return { code: 200, msg: '添加成功' };
  }
}
