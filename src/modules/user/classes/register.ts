/**
 * api文档信息
 */
import { ApiProperty } from '@nestjs/swagger';

export class resRegister {
  @ApiProperty({ example: 200, description: 'code代码' })
  code: number;
  @ApiProperty({ example: '注册成功', description: 'msg信息' })
  msg: string;
}
