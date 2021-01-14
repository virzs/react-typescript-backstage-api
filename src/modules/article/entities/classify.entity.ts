import { Article } from './article.entity';
import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
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
    default: null,
  })
  alias: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '分类描述',
    default: null,
  })
  introduction: string;

  @Column({
    type: 'int',
    default: 1,
    comment: '分类等级',
  })
  level: number;

  @TreeChildren()
  children: Article_Classify[];

  @TreeParent()
  parent: Article_Classify;

  @OneToMany(
    () => Article,
    article => article.classify,
  )
  articles: Article[];
}
