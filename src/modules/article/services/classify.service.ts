import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Article_Classify } from '../entities/classify.entity';

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

  async editClassify(body) {
    const { id, ...up } = body;
    const update = await this.ClassifyRepository.update(id, up);
    console.log(update, id, up);
    if (!update) throw new BadRequestException('修改失败');
    return { code: 200, msg: '修改成功' };
  }

  async getTreeList() {
    const tree = await this.ClassifyTreeRepository.findTrees();
    if (!tree) throw new BadRequestException('获取失败');
    return { code: 200, msg: '获取成功', data: tree };
  }

  async getTreePage(req) {
    const { page, pageSize, ...params } = req.query;
    console.log(page, pageSize, params);
    const pageData = await this.ClassifyTreeRepository.createQueryBuilder(
      'article_classify',
    )
      .where(params)
      .skip((page - 1) * pageSize)
      .take(pageSize) // 取pageSize筆數
      .getManyAndCount(); //返回总数
    const data = {
      reconds: pageData[0],
      total: pageData[1],
      page,
      pageSize,
    };
    return { code: 200, msg: '获取成功', data };
  }

  async getList(req) {
    const id = req.query.id || null;
    const data = await this.ClassifyRepository.findOne({ where: { id } });
    if (!data && id !== null) throw new BadRequestException('该分类不存在');
    const list =
      id === null
        ? await this.ClassifyTreeRepository.findRoots()
        : await this.ClassifyTreeRepository.findDescendantsTree(data);
    if (!list) throw new BadRequestException('操作失败');
    return { code: 200, msg: '查询成功', data: list };
  }
}
