import { Result } from '../../common/interface/result.interface';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(account: string, password: string): Promise<Result> {
    const user = await this.authService.validateUser(account, password);
    if (!user) throw new BadRequestException('用户不存在');
    return { code: 200, msg: '验证成功' };
  }
}
