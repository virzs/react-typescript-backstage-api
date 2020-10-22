import { Result } from '../../common/result.interface';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { brotliDecompress } from 'zlib';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async findAll(): Promise<Result> {
    let data = await this.UserRepository.find();
    return { code: 200, msg: '查询成功', data };
  }
  async register(body): Promise<Result> {
    body.createTime = new Date();
    if (!body.password) {
      return { code: 500, msg: '未输入密码' };
    }
    const find = this.UserRepository.find({ mobile: body.mobile });
    if (find) {
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
