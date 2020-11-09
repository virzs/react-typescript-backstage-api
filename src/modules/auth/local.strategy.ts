import { Result } from '../../common/interface/result.interface';
import { IStrategyOptions, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  //第一个参数为验证策略，第二个参数为策略名，默认为当前策略的名称
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    } as IStrategyOptions); //默认为username，password验证，当字段非默认字段时需要手动设置
  }
  //验证包中自动调用此方法做验证
  async validate(account: string, password: string): Promise<Result> {
    return await this.authService.validateUser(account, password);
  }
}
