import { Result } from '../../common/result.interface';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async byId(query): Promise<Result> {
    if (!query.id) return { code: 500, msg: '未获取到id' };
    let data = await this.UserRepository.find({
      select: ['mobile', 'id', 'email', 'name', 'createTime'],
      where: query,
    });
    return { code: 200, msg: '获取成功', data: data[0] };
  }
  async findAll(): Promise<Result> {
    let data = await this.UserRepository.find();
    return { code: 200, msg: '查询成功6464646461', data };
  }
  async register(body): Promise<Result> {
    body.createTime = new Date();
    if (!body.password) {
      return { code: 500, msg: '未输入密码' };
    }
    const find = await this.UserRepository.find({
      where: { mobile: body.mobile, email: body.email },
    });
    if (find.length > 0) {
      console.log(find.length);
      return { code: 500, msg: '当前手机号已注册' };
    }
    const res = await this.UserRepository.insert(body);
    console.log(res);
    if (res) {
      return { code: 200, msg: '注册成功' };
    } else {
      return { code: 500, msg: '出现错误' };
    }
  }
}
