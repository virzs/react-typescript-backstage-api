import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class addArticleDTO {
  @ApiProperty({ description: '文章名称' })
  @IsString()
  @IsNotEmpty({ message: '文章名称不能为空' })
  @Expose()
  @MaxLength(30, { message: '文章名称不能超过30字' })
  readonly name: string;

  @ApiProperty({ description: '文章内容' })
  @IsString()
  @IsNotEmpty({ message: '文章内容不能为空' })
  @Expose()
  readonly content: string;

  @ApiProperty({ description: '分类id' })
  @IsString()
  @Expose()
  readonly classifyId: string;

  @ApiProperty({ description: '标签id数组' })
  @IsArray()
  @Expose()
  readonly tagIds: Array<string>;

  @ApiProperty({ description: '是否置顶' })
  @IsNumber()
  @Expose()
  readonly isTop: number;

  @ApiProperty({ description: '是否允许评论' })
  @IsNumber()
  @Expose()
  readonly allow_comments: number;
}

export class editArticleDTO {
  @ApiProperty({ description: '文章id' })
  @IsString()
  @IsNotEmpty({ message: '文章id不能为空' })
  @Expose()
  id: string;

  @ApiProperty({ description: '文章名称' })
  @IsString()
  @IsNotEmpty({ message: '文章名称不能为空' })
  @Expose()
  @MaxLength(30, { message: '文章名称不能超过30字' })
  readonly name: string;

  @ApiProperty({ description: '文章内容' })
  @IsString()
  @IsNotEmpty({ message: '文章内容不能为空' })
  @Expose()
  readonly content: string;

  @ApiProperty({ description: '分类id' })
  @IsString()
  @Expose()
  readonly classifyId: string;

  @ApiProperty({ description: '标签id数组' })
  @IsArray()
  @Expose()
  readonly tagIds: Array<string>;

  @ApiProperty({ description: '是否置顶' })
  @IsNumber()
  @Expose()
  readonly isTop: number;

  @ApiProperty({ description: '是否允许评论' })
  @IsNumber()
  @Expose()
  readonly allow_comments: number;
}

export class deleteArticleDTO {
  @ApiProperty({ description: '文章id' })
  @IsString()
  @IsNotEmpty({ message: '文章id不能为空' })
  @Expose()
  readonly id: string;
}

export class detailArticleDTO {
  @ApiProperty({ description: '文章id' })
  @IsString()
  @IsNotEmpty({ message: '文章id不能为空' })
  @Expose()
  readonly id: string;
}

export class pageArticleDTO {
  @ApiProperty({ description: '当前页数' })
  @IsNumberString()
  @IsNotEmpty({ message: '当前页数不能为空' })
  @Expose()
  readonly current: number;

  @ApiProperty({ description: '每页数量' })
  @IsNumberString()
  @IsNotEmpty({ message: '每页数量不能为空' })
  @Expose()
  readonly size: number;
}
