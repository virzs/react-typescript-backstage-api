import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Result } from 'src/common/interface/result.interface';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  // 本地策略验证用户
  async validateUser(account: string, getPassword: string): Promise<any> {
    const user = await this.userService.validateUserByAccount(account);
    if (user) {
      const hashedPassword = user.password;
      const userSalt = user.salt;
      const hashPassword = encryptPassword(getPassword, userSalt);
      if (hashedPassword !== hashPassword)
        throw new BadRequestException('账号或密码错误');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...result } = user; //返回信息中删除敏感信息
      return result;
    }
    throw new BadRequestException('账号或密码错误');
  }

  async findUser(account) {
    const user = await this.userService.validateUserByAccount(account);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...result } = user;
      return result;
    }
    throw new BadRequestException('用户不存在');
  }

  async register(body): Promise<Result> {
    const find = await this.userService.validateUserByUserNameAndAccount(
      body.username,
      body.account,
    );
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
    const res = await this.userService.addUser(body);
    if (res) {
      return { code: 200, msg: '注册成功' };
    } else {
      return { code: 500, msg: '出现错误', data: res };
    }
  }

  /**
   * 生成accessToken
   */
  async getAccessToken(payload) {
    const token = this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return token;
  }

  /**
   * 生成refreshToken
   *
   */
  async getRefreshToken(payload) {
    const token = this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return token;
  }
  /**
   *
   * 刷新token
   */
  async refreshAccessToken(request) {
    const user = request.user;
    const payload = {
      account: user.account,
      id: user.id,
      type: user.type,
      state: user.state,
    };
    const accessTokenCookie = await this.getAccessToken(payload);
    const accessCookie = `Authentication=${accessTokenCookie}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
    request.res.setHeader('Set-Cookie', accessCookie);
    return { code: 200, msg: '刷新成功' };
  }

  /**
   * 登录
   */
  async loginWithCookies(body: any, req: any, res: any) {
    const user = req.user;
    const payload = {
      account: body.account,
      id: user.id,
      type: user.type,
      state: user.state,
    };
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);
    const accessCookie = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
    const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    await this.userService.updateOrSetRefreshTokenById(
      payload.id,
      refreshToken,
    );
    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...result } = user;
    return res.send({
      code: 200,
      msg: '登陆成功',
      data: {
        ...result,
      },
    });
  }

  async getCookieForLoginOut(req: any, res: any) {
    const accessCookie = `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    const refreshCookie = `Refresh=; HttpOnly; Path=/; Max-Age=0`;
    await this.userService.removeRefreshToken(req.user.id);
    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    return res.send({
      code: 200,
      msg: '注销成功',
    });
  }
}
