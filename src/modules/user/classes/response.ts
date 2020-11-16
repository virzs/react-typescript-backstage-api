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

export class resLogin {
  @ApiProperty({ example: 200, description: 'code代码' })
  code: number;
  @ApiProperty({ example: '登陆成功', description: 'msg信息' })
  msg: string;
  @ApiProperty({
    example: { id: '123', account: 'user', password: 'password' },
    description: '用户信息',
  })
  data: any;
}
