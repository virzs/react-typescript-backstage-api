import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CreateAndUpdateTimeEntity {
  @UpdateDateColumn()
  updateTime: Date;

  @CreateDateColumn()
  createTime: Date;
}
