import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class addClassifyDTO {
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

export class deleteClassifyDTO {
  @ApiProperty({ description: '当前分类id' })
  @IsString()
  @IsNotEmpty({ message: '分类id不能为空' })
  @Expose()
  id: string;
}

export class detailClassifyDTO {
  @ApiProperty({ description: '当前分类id' })
  @IsString()
  @IsNotEmpty({ message: '分类id不能为空' })
  @Expose()
  id: string;
}

export class getClassifyListDTO {
  @ApiProperty({ description: '分类id，为空时获取第一级分类' })
  @IsString()
  @IsOptional()
  @Expose()
  id: string;
}

export class getClassifyPageDTO {
  @ApiProperty({ example: 1, description: '当前页' })
  @IsNumber()
  @IsNotEmpty({ message: '当前页不能为空' })
  @Expose()
  readonly page: number;

  @ApiProperty({ example: 10, description: '每页的数量' })
  @IsNumber()
  @IsNotEmpty({ message: '当前页不能为空' })
  @Expose()
  readonly pageSize: number;
}
