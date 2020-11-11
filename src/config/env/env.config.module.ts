import { Module } from '@nestjs/common';
import { EnvConfigService } from './env.config.service';

@Module({
  providers: [
    {
      provide: EnvConfigService,
      useValue: new EnvConfigService(`${process.env.NODE_ENV}.env`),
    },
  ],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
