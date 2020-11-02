import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', default: null })
  mobile: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'varchar', default: null })
  email: string;

  @Column('varchar')
  username: string;
  @Column('varchar')
  salt: string;
  @Column('datetime')
  createTime: Date;
}
