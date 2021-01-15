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

  async detail(req) {
    const { id } = req;
    const result = await this.TagRepository.findOne(id);
    if (!result) throw new BadRequestException('没有找到这个标签');
    return { code: 200, msg: '获取成功', data: result };
  }

  async page(req) {
    const { current, size } = req;
    const result = await this.TagRepository.createQueryBuilder('article_tag')
      .skip((current - 1) * size)
      .take(size)
      .getManyAndCount();
    if (!result) throw new BadRequestException('获取分页信息失败');
    const data = {
      reconds: result[0],
      total: result[1],
      current: Number(current),
      size: Number(size),
    };
    return { code: 200, msg: '获取成功', data };
  }
}
