import { Result } from '../../common/result.interface';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async byId(query): Promise<Result> {
    if (!query.id) return { code: 500, msg: '未获取到id' };
    let data = await this.UserRepository.find({
      select: ['mobile', 'id', 'email', 'username', 'createTime'],
      where: query,
    });
    console.log(data);
    if (data.length > 0) {
      return { code: 200, msg: '获取成功', data: data[0] };
    } else {
      return { code: 500, msg: '未查询到此id对应的用户' };
    }
  }
  async findAll(): Promise<Result> {
    let data = await this.UserRepository.find();
    return { code: 200, msg: '查询成功6464646461', data };
  }
  async findOne(username): Promise<any> {
    let data = await this.UserRepository.findOne({ where: { username } });
    return { code: 200, msg: '查询成功', data };
  }
  async register(body): Promise<Result> {
    if (!body.password) {
      return { code: 500, msg: '未输入密码' };
    }
    if (body.password !== body.repassword) {
      return { code: 500, msg: '两次输入的密码不一致' };
    }
    const find = await this.UserRepository.findOne({
      where: { username: body.username },
    });
    if (find) {
      return { code: 500, msg: '当前用户名已注册' };
    }
    const salt = makeSalt();
    const hashPassword = encryptPassword(body.password, salt);
    body.password = hashPassword;
    body.salt = salt;
    body.createTime = new Date();
    const res = await this.UserRepository.insert(body);
    if (res) {
      return { code: 200, msg: '注册成功' };
    } else {
      return { code: 500, msg: '出现错误' };
    }
  }
}
