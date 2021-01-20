import { Module } from '@nestjs/common';
import { MenuModule } from './modules/menu.module';

@Module({
  imports: [MenuModule],
})
export default class SystemModule {}
