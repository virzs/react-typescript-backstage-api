import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar')
  mobile?: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  email?: string;

  @Column('varchar')
  name: string;

  @Column('datetime')
  createTime: Date;
}
