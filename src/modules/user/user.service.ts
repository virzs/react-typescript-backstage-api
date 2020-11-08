import { Result } from '../../common/interface/result.interface';
import { User } from './user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async getDetail(query): Promise<Result> {
    const data = await this.UserRepository.findOne({ where: query });
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...meta } = data;
      return { code: 200, msg: '获取成功', data: meta };
    } else {
      throw new BadRequestException('未查询到此id对应的用户');
    }
  }
  async getList(): Promise<Result> {
    const data = await this.UserRepository.find();
    let result = [];
    if (data.length > 0) {
      result = data.map(i => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, salt, ...meta } = i; //处理原始数据，返回排除项以外的数据
        return meta;
      });
    }
    return { code: 200, msg: '查询成功', data: result };
  }
  async findOne(username): Promise<any> {
    const data = await this.UserRepository.findOne({ where: { username } });
    return { code: 200, msg: '查询成功', data };
  }
  async getPage(body): Promise<Result> {
    const { page, pageSize, ...params } = body;
    const users = await this.UserRepository.createQueryBuilder('user')
      .where(params)
      .skip((page - 1) * pageSize)
      .take(pageSize) // 取pageSize筆數
      .getManyAndCount(); //返回总数

    let pageList = [];
    let data = {};
    if (users.length > 0) {
      pageList = users[0].map(i => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, salt, ...meta } = i; //处理原始数据，返回排除项以外的数据
        return meta;
      });
      data = {
        records: pageList,
        total: users[1],
        page: body.page,
        pageSize: body.pageSize,
      };
    }
    return { code: 200, msg: 'textPage', data };
  }
  async register(body): Promise<Result> {
    const find = await this.UserRepository.findOne({
      where: { username: body.username },
    });
    if (find) {
      throw new BadRequestException('当前用户名已注册');
    }
    if (body.password !== body.repassword) {
      throw new BadRequestException('两次输入的密码不一致');
    }
    const salt = makeSalt();
    const hashPassword = encryptPassword(body.password, salt);
    body.password = hashPassword;
    body.salt = salt;
    const res = await this.UserRepository.insert(body);
    if (res) {
      return { code: 200, msg: '注册成功' };
    } else {
      return { code: 500, msg: '出现错误' };
    }
  }
}
