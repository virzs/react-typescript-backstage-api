import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly ArticleRepository: Repository<Article>,
  ) {}

  async add(body) {
    const result = await this.ArticleRepository.insert(body);
    if (!result) throw new BadRequestException('添加失败');
    return { code: 200, msg: '添加成功' };
  }

  async edit(body) {
    const { id, ...update } = body;
    const result = await this.ArticleRepository.update(id, update);
    if (!result) throw new BadRequestException('修改失败');
    return { code: 200, msg: '修改成功' };
  }

  async delete(body) {
    const { id } = body;
    const result = await this.ArticleRepository.delete(id);
    if (!result) throw new BadRequestException('删除失败');
    return { code: 200, msg: '删除成功' };
  }

  async detail(query) {
    const { id } = query;
    const result = await this.ArticleRepository.findOne(id);
    if (!result) throw new BadRequestException('获取文章详情失败');
    return { code: 200, msg: '获取成功', data: result };
  }

  async page(query) {
    const { current, size } = query;
    const result = this.ArticleRepository.createQueryBuilder('article')
      .skip((current - 1) * size)
      .take(size)
      .getManyAndCount();
    if (!result) throw new BadRequestException('获取分页信息失败');
    const data = {
      reconds: result[0],
      total: result[1],
      current,
      size,
    };
    return { code: 200, msg: '获取成功', data };
  }
}
