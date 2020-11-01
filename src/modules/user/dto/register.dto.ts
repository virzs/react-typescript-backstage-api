/**
 * 验证注册时传入的数据
 */
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @Length(11, 11, {
    message: '手机号必须为11位',
  })
  mobile: string;
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
}
