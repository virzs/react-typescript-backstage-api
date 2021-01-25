import { System_Role } from './role.entity';
import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('system_menu')
@Tree('materialized-path')
export class System_Menu extends CreateAndUpdateTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 30, comment: '菜单名称' })
  public name: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '菜单别名',
  })
  public alias: string;

  @Column({ type: 'varchar', length: 100, comment: '菜单路径' })
  public path: string;

  @Column({ type: 'varchar', length: 100, comment: '备注' })
  public remark: string;

  @Column({ type: 'varchar', length: 30, comment: '菜单编号' })
  public code: string;

  @Column({ type: 'int', comment: '菜单类型 1 菜单 2 按钮' })
  public type: number;

  @Column({ type: 'int', comment: '排序', default: 0 })
  public sort: number;

  @Column({ type: 'tinyint', default: 0, comment: '是否隐藏 0 false 1 true' })
  public hidden: number;

  @TreeChildren()
  public children: System_Menu[];

  @TreeParent()
  public parent: System_Menu;

  @ManyToMany(
    () => System_Role,
    role => role.menus,
  )
  roles: System_Role[];
}
