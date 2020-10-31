import { User } from './user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Query, Response } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  byId(@Query() query) {
    return this.UserService.byId(query);
  }
  @Get('list')
  findAll(): Promise<{}> {
    return this.UserService.findAll();
  }
  @Post('register')
  register(@Body() body) {
    return this.UserService.register(body);
  }
}
