import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_role')
export class SystemRole extends CreateAndUpdateTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '角色名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '角色备注',
  })
  remark: string;

  @OneToMany(
    () => User,
    user => user.role,
  )
  user: User[];
}