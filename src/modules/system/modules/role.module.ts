import { RoleUserController } from './../controllers/roleUser.controller';
import { RoleUserService } from './../services/roleUser.service';
import { System_Menu } from './../entities/menu.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { RoleService } from './../services/role.service';
import { RoleController } from './../controllers/role.controller';
import { System_Role } from './../entities/role.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([System_Role, System_Menu, User])],
  controllers: [RoleController, RoleUserController],
  providers: [RoleService, RoleUserService],
  exports: [RoleService, RoleUserService],
})
export class RoleModule {}
