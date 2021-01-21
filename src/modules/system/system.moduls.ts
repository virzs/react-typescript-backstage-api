import { RoleModule } from './modules/role.module';
import { Module } from '@nestjs/common';
import { MenuModule } from './modules/menu.module';

@Module({
  imports: [MenuModule, RoleModule],
})
export default class SystemModule {}
