import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 20, comment: '账号，用于登录' })
  account: string;

  @Column({ type: 'varchar', length: 20, comment: '用户名，用于展示' })
  username: string;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
    comment: '用户手机号',
  })
  mobile: string;

  @Column({ type: 'varchar', comment: '用户密码', select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, comment: '用户邮箱' })
  email: string;

  @Column({ type: 'varchar', comment: '加密盐', select: false })
  salt: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    comment: '用户头像',
  })
  avatar: string;

  @Column({
    type: 'int',
    default: 0,
    comment: '账号类型：0普通用户、1编辑者、2作者、3管理员',
  })
  type: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '帐号状态：0正常、1封禁、2已删除',
  })
  state: number;

  @CreateDateColumn()
  createTime: Date;
}
