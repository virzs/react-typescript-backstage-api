import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshTokenStrategy } from './strategy/jwtRefreshToken.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: `${configService.get('JWT_ACCESS_TOKEN_SECRET')}`,
        //直接获取sercet会出现“secretOrPrivateKey must have a value”的错误
        signOptions: {
          expiresIn: `${configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
