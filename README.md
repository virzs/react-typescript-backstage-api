## NestJs + typeORM接口项目

## 安装模块

```bash
$ npm install
//或
$ yarn
```

## 启动项目

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 测试

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 目录结构

```
NODE-NESTJS-MAIN-API-TS
├── package.json
├── README.md
├── src
│   ├── utils（常用工具类）
│   ├── common（通用模块，自定义装饰器、过滤器、守卫、拦截器、中间件）
│   │   ├── decorators （项目通用装饰器）
│   │   ├── filters （过滤器）
│   │   ├── guards （守卫）
│   │   ├── interceptors （拦截器）
│   │   ├── middleware （中间件）
│   │   └── pipes （管道，主要用于数据验证和类型转换）
│   ├── config（配置文件信息）
│   ├── modules（业务代码模块）
│   │   └── users
│   │       ├── users.controller.ts （控制层）
│   │       ├── users.entity.ts （映射数据库模型对象）
│   │       ├── users.module.ts (模块定义）
│   │       └── users.service.ts （service层）
│   ├── main.ts（入口文件）
│   ├── app.modules（模块配置文件）
├── test（单元测试）
├── ...（其他配置文件）
```

