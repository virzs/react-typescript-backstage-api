import { Article_Classify } from './classify.entity';
import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Article extends CreateAndUpdateTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '文章标题',
  })
  title: string;

  @Column({
    type: 'bigint',
    comment: '文章内容',
  })
  content: string;

  @Column({
    type: 'varchar',
    comment: '文章主图',
  })
  picture: string;

  @ManyToOne(
    () => User,
    author => author.articles,
  )
  author: User;

  @ManyToOne(
    () => Article_Classify,
    classify => classify.articles,
  )
  classify: Article_Classify;

  @ManyToMany(
    () => Article,
    article => article.tags,
  )
  @JoinTable()
  tags: Article[];

  @Column({
    type: 'int',
    default: 0,
    comment: '是否置顶 0否，1是',
  })
  isTop: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '是否允许评论 0否 1是',
  })
  allow_comments: number;
}
