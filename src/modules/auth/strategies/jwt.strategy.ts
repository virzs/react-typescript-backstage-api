import { AuthService } from '../services/auth.service';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      /* 通过cookie方式获取token，已废弃 */

      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     console.log(request.header.token);
      //     return request?.cookies?.Authentication;
      //   },
      // ]),

      /* 通过header方式获取token */

      jwtFromRequest: ExtractJwt.fromHeader('access_token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    } as StrategyOptions);
  }

  async validate(payload: any) {
    return await this.authService.findUser(payload.account);
  }
}
