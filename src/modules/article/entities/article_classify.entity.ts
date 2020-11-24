import { CreateAndUpdateTimeEntity } from 'src/common/entities/createAndUpdateTime.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '父级分类id',
  })
  parentId: string;
}
