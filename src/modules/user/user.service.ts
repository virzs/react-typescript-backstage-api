import { Result } from '../../common/interface/result.interface';
import { User } from './entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  /**
   * 依据账号验证用户
   * @params(account)账号
   */
  async validateUserByAccount(account: string): Promise<User> {
    return await this.UserRepository.createQueryBuilder('user')
      .where({
        account,
      })
      .addSelect(['user.password', 'user.salt'])
      .getOne();
  }

  /**
   * 依据用户名和账号验证用户
   */
  async validateUserByUserNameAndAccount(
    username: string,
    account: string,
  ): Promise<User> {
    return await this.UserRepository.findOne({
      where: [{ username }, { account }],
    });
  }

  /**
   * 获取用户详情
   */
  async getDetail(req): Promise<Result> {
    return { code: 200, msg: '获取成功', data: req.user };
  }

  /**
   * 根据id获取用户详情
   */
  async getDetailById(query): Promise<Result> {
    const data = await this.UserRepository.findOne({ where: { id: query.id } });
    if (!data) throw new BadRequestException('没有该用户');
    return { code: 200, msg: '获取成功', data };
  }
  async findOne(account): Promise<any> {
    const data = await this.UserRepository.findOne({ where: { account } });
    return { code: 200, msg: '查询成功', data };
  }
  /**
   * 添加用户
   */
  async addUser(body): Promise<any> {
    return await this.UserRepository.insert(body);
  }
  /**
   * 获取用户分页
   */
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
}
