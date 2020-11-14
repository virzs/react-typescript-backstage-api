import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
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
  @IsNumber(
    { allowNaN: false },
    { message: 'type必须为数字类型', always: false },
  )
  @IsOptional() //可选值
  readonly type: number;
}
