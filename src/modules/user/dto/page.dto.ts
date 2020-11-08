import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class PageDTO {
  @ApiProperty({ example: 1, description: '当前页' })
  @IsNumber()
  @IsNotEmpty({ message: '当前页不能为空' })
  readonly page: number;

  @ApiProperty({ example: 10, description: '每页的数量' })
  @IsNumber()
  @IsNotEmpty({ message: '当前页不能为空' })
  readonly pageSize: number;

  @ApiProperty({ example: 0, default: '', description: '用户类型' })
  @IsNumber()
  readonly type: number;
}
