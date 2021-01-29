import { User } from './../../user/entities/user.entity';
import { System_Role } from './../entities/role.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//角色关联用户部分
@Injectable()
export class RoleUserService {
  constructor(
    @InjectRepository(System_Role)
    private readonly roleRepository: Repository<System_Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //角色关联用户
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
      .leftJoinAndSelect('user.role', 'role')
      .where({ role: { id: params.roleId } })
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
