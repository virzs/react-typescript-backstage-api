import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateClassifyDTO {
  @ApiProperty({ description: '文章分类名' })
  @IsString()
  @IsOptional()
  @Expose()
  name: string;

  @ApiProperty({ description: '文章分类别名' })
  @IsString()
  @IsOptional()
  @Expose()
  alias: string;
}
