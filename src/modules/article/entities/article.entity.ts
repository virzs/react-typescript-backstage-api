import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'varchar',
    comment: '所属分类id',
  })
  classifyId: string;

  @Column({
    type: 'int',
    default: 0,
    comment: '是否置顶 0否，1是',
  })
  isTop: number;
}
