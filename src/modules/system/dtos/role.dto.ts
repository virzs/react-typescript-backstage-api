import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class createRoleDTO {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  @IsNotEmpty({ message: '角色名称不能为空' })
  @Expose()
  @MaxLength(30, { message: '角色名称不能超过30字' })
  name: string;

  @ApiProperty({ description: '角色名称' })
  @IsString()
  @IsNotEmpty({ message: '角色名称不能为空' })
  @Expose()
  @MaxLength(30, { message: '角色名称不能超过30字' })
  remark: string;
}

export class associatedUserDTO {
  @ApiProperty({ description: '用户id' })
  @IsString()
  @IsNotEmpty({ message: '用户id不能为空' })
  @Expose()
  userId: string;

  @ApiProperty({ description: '角色id' })
  @IsString()
  @IsNotEmpty({ message: '角色id不能为空' })
  @Expose()
  roleId: string;
}
export class associatedUserPageRoleDTO {
  @ApiProperty({ description: '当前页' })
  @IsNumberString()
  @Expose()
  @IsNotEmpty()
  current: number;

  @ApiProperty({ description: '每页数量' })
  @IsNumberString()
  @Expose()
  @IsNotEmpty()
  size: number;

  @ApiProperty({ description: '角色id' })
  @IsString()
  @Expose()
  @IsNotEmpty()
  roleId: number;
}

export class pageRoleDTO {
  @ApiProperty({ description: '当前页' })
  @IsNumberString()
  @Expose()
  @IsNotEmpty()
  current: number;

  @ApiProperty({ description: '每页数量' })
  @IsNumberString()
  @Expose()
  @IsNotEmpty()
  size: number;
}
