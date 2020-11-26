import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Article_Classify } from './entities/article_classify.entity';

@Injectable()
export class ArticleClassifyService {
  constructor(
    @InjectRepository(Article_Classify)
    private readonly ClassifyRepository: Repository<Article_Classify>,
    @InjectRepository(Article_Classify)
    private readonly ClassifyTreeRepository: TreeRepository<Article_Classify>,
  ) {}

  async addClassify(body) {
    if (!body.parentId) body.parentId = null;
    const parent = await this.ClassifyRepository.findOne({
      where: { id: body.parentId },
    });
    if (!parent && body.parentId !== null)
      throw new BadRequestException('上级分类不存在');
    body.level = parent ? parent.level + 1 : 1;
    body.parent = parent;
    const data = await this.ClassifyRepository.insert(body);
    if (!data) throw new BadRequestException('添加失败');
    return { code: 200, msg: '添加成功' };
  }

  async getTreeList() {
    const tree = await this.ClassifyTreeRepository.findTrees();
    if (!tree) throw new BadRequestException('获取失败');
    return { code: 200, msg: '获取成功', data: tree };
  }
}
