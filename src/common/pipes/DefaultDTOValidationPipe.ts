import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Logger } from '../../utils/log4';

@Injectable()
export class DefaultDTOValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log('error', Object.values(errors[0].constraints)[0]);
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      Logger.error(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value;
  }
  private toValidate(metaType): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metaType === type);
  }
}