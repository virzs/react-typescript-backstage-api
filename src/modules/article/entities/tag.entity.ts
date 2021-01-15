import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article_Tag extends CreateAndUpdateTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签别名',
    default: null,
  })
  alias: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '标签描述',
    default: null,
  })
  introduction: string;
}
