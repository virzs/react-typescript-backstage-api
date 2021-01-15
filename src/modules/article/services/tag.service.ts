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

  async editTag(body) {
    const { id, ...up } = body;
    const result = await this.TagRepository.update(id, up);
    if (!result) throw new BadRequestException('修改失败');
    return { code: 200, msg: '修改成功' };
  }

  async deleteTag(body) {
    const { id } = body;
    const deleted = await this.TagRepository.delete(id);
    if (!deleted) throw new BadRequestException('删除失败');
    return { code: 200, msg: '删除成功' };
  }
}
