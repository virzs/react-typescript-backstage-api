/* 角色权限 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Authority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true, comment: '权限名称' })
  name: string;

  @Column({ type: 'varchar', length: 100, comment: '权限介绍' })
  introduction: string;

  @Column({ type: 'varchar', length: 140, comment: '路径' })
  path: string;

  @CreateDateColumn()
  createTime: Date;
}
