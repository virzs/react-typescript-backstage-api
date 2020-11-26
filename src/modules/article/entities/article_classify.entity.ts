import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('nested-set')
export class Article_Classify extends CreateAndUpdateTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '文章分类名',
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 30,
    comment: '别名',
  })
  alias: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '分类描述',
  })
  introduction: string;

  @Column({
    type: 'int',
    default: 1,
    comment: '分类等级',
  })
  level: number;

  @TreeParent()
  parent: Article_Classify;

  @TreeChildren()
  children: Article_Classify[];
}
