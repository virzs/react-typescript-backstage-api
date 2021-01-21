import { User } from 'src/modules/user/entities/user.entity';
import { System_Role } from './../entities/role.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(System_Role)
    private readonly roleRepository: Repository<System_Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //初始化
  async init() {
    const defaultData = [
      {
        name: '管理员',
        remark: '默认最高权限角色',
      },
      {
        name: '作者',
        remark: '默认可发布内容角色',
      },
      {
        name: '用户',
        remark: '普通用户',
      },
    ];
    const data = await this.roleRepository.find();
    if (data.length === 0) {
      const init = await this.roleRepository.save(defaultData);
      return init;
    }
    return true;
  }

  async create(body) {
    const result = this.roleRepository.save(body);
    if (!result) throw new BadRequestException('添加失败');
    return { code: 200, msg: '添加成功' };
  }

  async update(body) {
    const { id, ...update } = body;
    const result = this.roleRepository.update(id, update);
    if (!result) throw new BadRequestException('更新失败');
    return { code: 200, msg: '更新成功' };
  }

  async delete(body) {
    const { id } = body;
    const result = this.roleRepository.delete(id);
    if (!result) throw new BadRequestException('删除失败');
    return { code: 200, msg: '删除成功' };
  }

  //关联用户
  async associatedUser(body) {
    const { userId, roleId } = body;
    const role = await this.roleRepository.findOne(roleId);
    if (!role) throw new BadRequestException('该角色不存在');
    const result = this.userRepository.update(userId, { role: roleId });
    if (!result) throw new BadRequestException('关联角色失败');
    return { code: 200, msg: '关联角色成功' };
  }

  //获取角色关联的用户分页
  async associatedUserPage(query) {
    const { current, size, ...params } = query;
    const pageData = await this.userRepository
      .createQueryBuilder('user')
      .skip((current - 1) * size)
      .take(size) // 取pageSize筆數
      .setParameter('roleId', params.roleId)
      .getManyAndCount(); //返回总数
    const data = {
      reconds: pageData[0],
      total: pageData[1],
      current: Number(current),
      size: Number(size),
    };
    return { code: 200, msg: '获取成功', data };
  }

  async page(query) {
    const { current, size, ...params } = query;
    const pageData = await this.roleRepository
      .createQueryBuilder('role')
      .where(params)
      .skip((current - 1) * size)
      .take(size) // 取pageSize筆數
      .getManyAndCount(); //返回总数
    const data = {
      reconds: pageData[0],
      total: pageData[1],
      current: Number(current),
      size: Number(size),
    };
    return { code: 200, msg: '获取成功', data };
  }
}
