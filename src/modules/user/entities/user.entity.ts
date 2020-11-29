import { Role } from 'src/modules/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '账号，用于登录',
    unique: true, //不可重复
  })
  account: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '用户名，用于展示',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
    comment: '用户手机号',
    unique: true,
  })
  mobile: string;

  @Column({ type: 'varchar', comment: '用户密码', select: false })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '用户邮箱',
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', comment: '加密盐', select: false })
  salt: string;

  @Column({
    type: 'longtext',
    nullable: true,
    comment: '用户头像',
  })
  avatar: string;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Role,
    role => role.users,
  )
  role: Role;

  @Column({
    type: 'int',
    default: 0,
    comment: '帐号状态：0正常、1封禁、2已删除',
  })
  state: number;

  @CreateDateColumn()
  createTime: Date;

  @Column({
    type: 'varchar',
    comment: 'refresh_token',
    nullable: true,
    select: false,
  })
  refreshToken: string;
}
