import { Module } from '@nestjs/common';
import { AuthModule as authModule } from './modules/auth.module';
@Module({
  imports: [authModule],
})
export default class AuthModule {}
