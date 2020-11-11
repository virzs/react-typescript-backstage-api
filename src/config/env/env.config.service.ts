import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [prop: string]: string;
}

export class EnvConfigService {
  private readonly envConfig: EnvConfig;
  constructor(filePath: string) {
    //filePath文件路径
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key]; //返回每个属性
  }
}
