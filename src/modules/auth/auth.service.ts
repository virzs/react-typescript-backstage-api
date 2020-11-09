import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/common/interface/result.interface';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 本地策略验证用户
  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.UserRepository.createQueryBuilder('user')
      .where({
        account,
      })
      .addSelect(['user.password', 'user.salt'])
      .getOne();
    if (user) {
      const hashedPassword = user.password;
      const userSalt = user.salt;
      const hashPassword = encryptPassword(password, userSalt);
      if (hashedPassword !== hashPassword)
        throw new BadRequestException('密码错误');
      return user;
    }
    throw new BadRequestException('用户不存在');
  }

  async findUser(id) {
    const user = this.UserRepository.findByIds(id);
    if (user) return user;
    throw new BadRequestException('用户不存在');
  }

  async register(body): Promise<Result> {
    const find = await this.UserRepository.findOne({
      where: [{ username: body.username }, { account: body.account }],
    });
    if (find) {
      if (find.account === body.account)
        throw new BadRequestException('当前账号已注册');
      if (find.username === body.username)
        throw new BadRequestException('当前用户名已被使用');
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

  async login(body: any, req: any): Promise<Result> {
    const user = req.user;
    const payload = {
      account: body.account,
      id: user.id,
      type: user.type,
      state: user.state,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...result } = user;
    return {
      code: 200,
      msg: '登陆成功',
      data: {
        assets_token: this.jwtService.sign(payload),
        ...result,
      },
    };
  }
}
