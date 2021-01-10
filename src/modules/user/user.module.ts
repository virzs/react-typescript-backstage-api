import { Module } from '@nestjs/common';
import { UserModule as userModule } from './modules/user.module';
@Module({
  imports: [userModule],
})
export default class UserModule {}
