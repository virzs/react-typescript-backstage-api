import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'account', description: '账号' })
  @IsString()
  @IsNotEmpty({ message: '账号不能为空' })
  @Expose()
  account: string;

  @ApiProperty({ example: 'password', description: '密码' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Expose()
  password: string;
}
