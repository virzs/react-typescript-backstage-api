import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDTO {
  @ApiProperty({ example: 'xxx', description: '用户id' })
  @IsString()
  @IsNotEmpty({ message: 'id不能为空' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'username', description: '用户名' })
  @IsString()
  @IsOptional()
  @Expose()
  username: string;

  @ApiProperty({
    example: 'http://www.xxx.com/xxx.png',
    description: '用户头像',
  })
  @IsString()
  @IsOptional()
  @Expose()
  avatar: string;
}
