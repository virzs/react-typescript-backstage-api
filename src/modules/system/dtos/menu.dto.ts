import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class createMenuDTO {
  @ApiProperty({ description: '菜单名称' })
  @IsString()
  @IsNotEmpty({ message: '菜单名称不能为空' })
  @MaxLength(30, { message: '菜单名称不能超过30字' })
  @Expose()
  readonly name: string;

  @ApiProperty({ description: '菜单别名' })
  @IsString()
  @MaxLength(30, { message: '菜单别名不能超过30字' })
  @Expose()
  readonly alias: string;

  @ApiProperty({ description: '菜单路径' })
  @IsString()
  @MaxLength(100, { message: '菜单路径长度不能超过100字' })
  @IsNotEmpty({ message: '菜单路径不能为空' })
  @Expose()
  readonly path: string;

  @ApiProperty({ description: '菜单备注' })
  @IsString()
  @MaxLength(100, { message: '菜单备注不能超过100字' })
  @Expose()
  readonly remark: string;

  @ApiProperty({ description: '菜单编号' })
  @IsString()
  @IsNotEmpty({ message: '菜单编号不能为空' })
  @Expose()
  readonly code: number;

  @ApiProperty({ description: '菜单类型' })
  @IsNumberString()
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @Expose()
  readonly type: number;

  @ApiProperty({ description: '菜单排序' })
  @IsNumberString()
  @IsNotEmpty({ message: '菜单排序不能为空' })
  @Expose()
  readonly sort: number;

  @ApiProperty({ description: '菜单是否隐藏' })
  @IsNumberString()
  @IsNotEmpty({ message: '菜单是否隐藏不能为空' })
  @Expose()
  readonly hidden: number;
}

export class updateMenuDTO {
  @ApiProperty({ description: '菜单id' })
  @IsString()
  @IsNotEmpty({ message: '菜单id不能为空' })
  @Expose()
  readonly id: string;

  @ApiProperty({ description: '菜单名称' })
  @IsString()
  @IsNotEmpty({ message: '菜单名称不能为空' })
  @MaxLength(30, { message: '菜单名称不能超过30字' })
  @Expose()
  readonly name: string;

  @ApiProperty({ description: '菜单别名' })
  @IsString()
  @MaxLength(30, { message: '菜单别名不能超过30字' })
  @Expose()
  readonly alias: string;

  @ApiProperty({ description: '菜单路径' })
  @IsString()
  @MaxLength(100, { message: '菜单路径长度不能超过100字' })
  @IsNotEmpty({ message: '菜单路径不能为空' })
  @Expose()
  readonly path: string;

  @ApiProperty({ description: '菜单备注' })
  @IsString()
  @MaxLength(100, { message: '菜单备注不能超过100字' })
  @Expose()
  readonly remark: string;

  @ApiProperty({ description: '菜单编号' })
  @IsString()
  @IsNotEmpty({ message: '菜单编号不能为空' })
  @Expose()
  readonly code: number;

  @ApiProperty({ description: '菜单类型' })
  @IsNumberString()
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @Expose()
  readonly type: number;

  @ApiProperty({ description: '菜单排序' })
  @IsNumberString()
  @IsNotEmpty({ message: '菜单排序不能为空' })
  @Expose()
  readonly sort: number;

  @ApiProperty({ description: '菜单是否隐藏' })
  @IsNumberString()
  @IsNotEmpty({ message: '菜单是否隐藏不能为空' })
  @Expose()
  readonly hidden: number;
}

export class deleteMenuDTO {
  @ApiProperty({ description: '菜单id' })
  @IsNotEmpty({ message: '菜单id不能为空' })
  @Expose()
  @IsString()
  id: string;
}

export class detailMenuDTO {
  @ApiProperty({ description: '菜单id' })
  @IsNotEmpty({ message: '菜单id不能为空' })
  @Expose()
  @IsString()
  id: string;
}
