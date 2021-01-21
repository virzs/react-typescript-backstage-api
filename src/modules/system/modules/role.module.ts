import { User } from 'src/modules/user/entities/user.entity';
import { RoleService } from './../services/role.service';
import { RoleController } from './../controllers/role.controller';
import { System_Role } from './../entities/role.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([System_Role, User])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
