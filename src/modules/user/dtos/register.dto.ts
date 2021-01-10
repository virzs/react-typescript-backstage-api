/**
 * 验证注册时传入的数据
 */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ example: 'name1', description: '用户名' })
  @IsString({ message: '用户名必须为string类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Expose()
  readonly username: string;

  @ApiProperty({ example: 'name1', description: '账号' })
  @IsString({ message: '账号必须为string类型' })
  @IsNotEmpty({ message: '账号不能为空' })
  @Expose()
  readonly account: string;

  @ApiProperty({ example: '12345678', description: '密码' })
  @IsString({ message: '密码必须为string类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Expose()
  readonly password: string;

  @ApiProperty({ example: '12345678', description: '再次输入密码' })
  @IsString({ message: '重复密码必须为string类型' })
  @IsNotEmpty({ message: '重复密码不能为空' })
  @Expose()
  readonly repassword: string;
}
