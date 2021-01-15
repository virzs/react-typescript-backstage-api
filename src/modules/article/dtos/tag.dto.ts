import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class addTagDTO {
  @ApiProperty({ description: '标签名称' })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty({ message: '标签名称不能为空' })
  @Expose()
  name: string;

  @ApiProperty({ description: '标签别名' })
  @IsString()
  @MaxLength(20)
  @Expose()
  alias: string;

  @ApiProperty({ description: '标签描述' })
  @IsString()
  @MaxLength(100)
  @Expose()
  introduction: string;
}

export class editTagDTO {
  @ApiProperty({ description: '标签id' })
  @IsString()
  @IsNotEmpty({ message: '标签id不能为空' })
  @Expose()
  id: string;

  @ApiProperty({ description: '标签名称' })
  @IsString()
  @IsNotEmpty({ message: '标签名称不能为空' })
  @Expose()
  @MaxLength(20)
  name: string;

  @ApiProperty({ description: '标签别名' })
  @IsString()
  @Expose()
  @MaxLength(20)
  alias: string;

  @ApiProperty({ description: '标签描述' })
  @IsString()
  @Expose()
  @MaxLength(100)
  introduction: string;
}

export class deleteTagDTO {
  @ApiProperty({ description: '标签id' })
  @IsString()
  @IsNotEmpty({ message: '标签id不能为空' })
  @Expose()
  id: string;
}

export class detailTagDTO {
  @ApiProperty({ description: '标签id' })
  @IsString()
  @IsNotEmpty({ message: '标签id不能为空' })
  @Expose()
  id: string;
}
