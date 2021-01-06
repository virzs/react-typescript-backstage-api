import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
export class System_Menu extends CreateAndUpdateTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '菜单名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '菜单别名',
  })
  alias: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '备注',
  })
  remark: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '菜单编号',
  })
  code: string;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '是否隐藏',
  })
  hidden: boolean;

  @TreeChildren()
  children: System_Menu[];

  @TreeParent()
  parent: System_Menu;
}
