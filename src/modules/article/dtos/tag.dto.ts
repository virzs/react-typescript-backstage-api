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
  @Expose()
  introduction: string;
}
