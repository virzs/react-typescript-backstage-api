import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/modules/user/services/user.service';
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      /* cookie方式获取refreshToken，已废弃 */
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     return request?.cookies?.Refresh;
      //   },
      // ]),
      /* 通过header方式获取token */

      jwtFromRequest: ExtractJwt.fromHeader('refresh_token'),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    } as StrategyOptions);
  }

  async validate(request: Request, payload) {
    const refreshToken = request.header('refresh_token');
    return this.userService.getUserWhereRefreshTokenMatches(
      payload.id,
      refreshToken,
    );
  }
}
