import { DefaultDTOValidationPipe } from './../../shared/DefaultDTOValidationPipe';
import { RegisterDTO } from './dto/register.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DetailDTO } from './dto/detail.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { resRegister } from './classes/register';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @UsePipes(DefaultDTOValidationPipe)
  @ApiQuery({
    name: 'id',
    description: '传入用户id',
  })
  byId(@Query() query: DetailDTO) {
    return this.UserService.byId(query);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  findAll(): Promise<any> {
    return this.UserService.findAll();
  }
  @Post('register')
  @UsePipes(DefaultDTOValidationPipe)
  @ApiBody({
    type: RegisterDTO,
    description: '传入参数',
  })
  @ApiResponse({
    status: 200,
    description: '获取成功',
    type: resRegister,
  })
  register(@Body() body: RegisterDTO) {
    return this.UserService.register(body);
  }
}
