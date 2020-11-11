import { EnvConfigService } from 'src/config/env/env.config.service';

const envConfigService = new EnvConfigService(`${process.env.NODE_ENV}.env`);

export const jwtConstants = {
  secret: envConfigService.get('JWT_SECRET'),
};
