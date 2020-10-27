import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  constructor(filePath: string) {
    //filePath文件路径
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    console.log(this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key]; //返回每个属性
  }
}
