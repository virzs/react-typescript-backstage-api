import { IsNotEmpty, IsString } from 'class-validator';

export class DetailDTO {
  @IsNotEmpty({ message: 'id不能为空' })
  @IsString({ message: 'id必须为string类型' })
  readonly id: string;
}
