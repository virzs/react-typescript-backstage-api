import { Module } from '@nestjs/common';
import { DefaultDTOValidationPipe } from '../common/pipes/defaultDTOValidation.pipe';
@Module({
  providers: [DefaultDTOValidationPipe],
})
export class SharedModule {}
