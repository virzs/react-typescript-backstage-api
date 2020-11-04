/**
 * 验证注册时传入的数据
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ example: 'name1', description: '用户名' })
  @IsString()
  username: string;
  @ApiProperty({ example: '12345678', description: '密码' })
  @IsString()
  password: string;
  @ApiProperty({ example: '12345678', description: '再次输入密码' })
  @IsString()
  repassword: string;
}
