import { System_Menu } from './../entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(System_Menu)
    private readonly menuRepository: Repository<System_Menu>,
    @InjectRepository(System_Menu)
    private readonly menuTreeRepository: TreeRepository<System_Menu>,
  ) {}

  async create(body) {
    const parentId = body.parentId || null;
    const parent = await this.menuRepository.findOne(parentId);
    if (!parent && parentId !== null)
      throw new BadRequestException('上级分类不存在');
    const result = await this.menuRepository.save(body);
    if (!result) throw new BadRequestException('添加失败');
    return { code: 200, msg: '添加成功' };
  }

  async update(body) {
    const { id, ...update } = body;
    const result = await this.menuRepository.update(id, update);
    if (!result) throw new BadRequestException('编辑失败');
    return { code: 200, msg: '编辑成功' };
  }

  async delete(body) {
    const { id } = body;
    const detail = await this.menuRepository.findOne(id);
    if (!detail) throw new BadRequestException('没有此菜单');
    const childrens = await this.menuTreeRepository.findDescendantsTree(detail);
    if (childrens && childrens.children)
      throw new BadRequestException('当前菜单下存在子菜单，无法删除');
    const result = await this.menuRepository.delete(id);
    if (!result) throw new BadRequestException('删除失败');
    return { code: 200, msg: '删除成功' };
  }

  async detial(query) {
    const { id } = query;
    const result = await this.menuRepository.findOne(id);
    if (!result) throw new BadRequestException('没有此菜单');
    return { code: 200, msg: '获取成功', data: result };
  }

  async treeList() {
    const result = await this.menuTreeRepository.findTrees();
    if (!result) throw new BadRequestException('获取菜单失败');
    return { code: 200, msg: '获取成功', data: result };
  }
}
