import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class PageDTO {
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
