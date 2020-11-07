import { Module } from '@nestjs/common';
import { DefaultDTOValidationPipe } from '../common/pipes/DefaultDTOValidationPipe';
@Module({
  providers: [DefaultDTOValidationPipe],
})
export class SharedModule {}
