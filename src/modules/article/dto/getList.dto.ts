import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class getListDTO {
  @ApiProperty({ description: '分类id，为空时获取第一级分类' })
  @IsString()
  @IsOptional()
  @Expose()
  id: string;
}
