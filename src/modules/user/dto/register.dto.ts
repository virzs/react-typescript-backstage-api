/**
 * 验证注册时传入的数据
 */
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  repassword: string;
}
