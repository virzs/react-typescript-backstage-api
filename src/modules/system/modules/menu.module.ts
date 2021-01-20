import { MenuService } from './../services/menu.service';
import { System_Menu } from './../entities/menu.entity';
import { MenuController } from './../controllers/menu.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([System_Menu])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
