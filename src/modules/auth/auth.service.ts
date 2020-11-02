import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/common/result.interface';
import { encryptPassword } from 'src/utils/cryptogram';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user && user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(body: any): Promise<Result> {
    const user = await this.UserRepository.findOne({
      where: { username: body.username },
    });
    if (!user) {
      return { code: 500, msg: '当前用户不存在' };
    }
    const hashedPassword = user.password;
    const salt = user.salt;
    const hashPassword = encryptPassword(body.password, salt);
    if (hashedPassword !== hashPassword) {
      return { code: 500, msg: '密码错误' };
    }
    const payload = { username: body.username, id: user.id };
    return {
      code: 200,
      msg: '登陆成功',
      data: {
        token: this.jwtService.sign(payload),
      },
    };
  }
}
