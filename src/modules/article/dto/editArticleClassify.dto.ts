import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class editClassifyDTO {
  @ApiProperty({ description: '文章分类id' })
  @IsString()
  @IsNotEmpty({ message: '分类id不能为空' })
  @Expose()
  id: string;

  @ApiProperty({ description: '文章分类名称' })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty({ message: '分类名称不能为空' })
  @Expose()
  name: string;

  @ApiProperty({ description: '文章分类别名' })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  @Expose()
  alias: string;

  @ApiProperty({ description: '文章分类描述' })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  @Expose()
  introduction: string;

  @ApiProperty({ description: '父级分类id' })
  @IsString()
  @IsOptional()
  @Expose()
  parentId: string;
}
