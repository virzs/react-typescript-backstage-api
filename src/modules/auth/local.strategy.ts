import { Result } from './../../common/result.interface';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Result> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException(
        { code: 500, msg: '当前用户不存在' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { code: 200, msg: '验证成功' };
  }
}
