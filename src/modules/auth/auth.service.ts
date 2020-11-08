import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/common/interface/result.interface';
import { encryptPassword } from 'src/utils/cryptogram';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user && user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(body: any): Promise<Result> {
    const user = await this.UserRepository.findOne({
      where: { username: body.username },
    });
    if (!user) throw new BadRequestException('当前用户不存在');
    const hashedPassword = user.password;
    const salt = user.salt;
    const hashPassword = encryptPassword(body.password, salt);
    if (hashedPassword !== hashPassword)
      throw new BadGatewayException('密码错误');
    const payload = { username: body.username, id: user.id };
    return {
      code: 200,
      msg: '登陆成功',
      data: {
        assets_token: this.jwtService.sign(payload),
      },
    };
  }
}
