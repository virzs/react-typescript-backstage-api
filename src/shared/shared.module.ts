import { Module } from '@nestjs/common';
import { DefaultDTOValidationPipe } from './DefaultDTOValidationPipe';
@Module({
  providers: [DefaultDTOValidationPipe],
})
export class SharedModule {}
