import { Result } from '../../common/interface/result.interface';
import { User } from './entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
   * 更新refrestoken
   * @param req
   */
  async updateOrSetRefreshTokenById(id: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10); //加密refreshToken
    await this.UserRepository.update(id, { refreshToken: hashedToken });
  }
  /**
   * 删除数据库中存放的refresh Token
   *
   */
  async removeRefreshToken(id: string) {
    return this.UserRepository.update(id, {
      refreshToken: null,
    });
  }

  /**
   * 匹配token
   * @param req
   */
  async getUserWhereRefreshTokenMatches(id: string, refreshToken: string) {
    const user = await this.UserRepository.createQueryBuilder('user')
      .where({ id })
      .addSelect(['user.refreshToken'])
      .getOne();
    const isMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (isMatches) return user;
  }

  /**
   * 获取用户详情
   */
  async getDetail(req): Promise<Result> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...result } = req.user;
    return { code: 200, msg: '获取成功', data: result };
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
   * 修改用户信息
   * @param body
   */
  async updateInfo(body): Promise<Result> {
    const { id, avatar, username } = body;
    console.log(body);
    const validateUser = await this.UserRepository.findOne({
      where: { username },
    });
    if (validateUser) throw new BadRequestException('该用户名已存在');
    //TODO验证参数，验证参数管道
    const user = await this.UserRepository.update({ id }, body);
    if (!user) throw new BadRequestException('出现错误请稍后重试');
    return { code: 200, msg: '更新成功' };
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
