import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
