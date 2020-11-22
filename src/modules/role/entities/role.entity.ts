/* 角色 */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '角色名',
    unique: true,
  })
  name: string;

  @Column({
    type: 'int',
    comment: '角色值',
    unique: true,
  })
  status: number;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => User,
    user => user.role,
  )
  users: User[];

  @CreateDateColumn()
  createTime: Date;
}
