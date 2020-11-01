import { DefaultDTOValidationPipe } from './../../shared/DefaultDTOValidationPipe';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { DetailDTO } from './dto/detail.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @UsePipes(DefaultDTOValidationPipe)
  byId(@Query() query: DetailDTO) {
    return this.UserService.byId(query);
  }
  @Get('list')
  findAll(): Promise<{}> {
    return this.UserService.findAll();
  }
  @Post('register')
  @UsePipes(DefaultDTOValidationPipe)
  register(@Body() body: RegisterDTO) {
    return this.UserService.register(body);
  }
}
