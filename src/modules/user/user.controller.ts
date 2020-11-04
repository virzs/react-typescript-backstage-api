import { DefaultDTOValidationPipe } from './../../shared/DefaultDTOValidationPipe';
import { RegisterDTO } from './dto/register.dto';
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
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';

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
  findAll(): Promise<{}> {
    return this.UserService.findAll();
  }
  @Post('register')
  @UsePipes(DefaultDTOValidationPipe)
  @ApiBody({
    type: Object,
    description: '传入参数',
  })
  register(@Body() body: RegisterDTO) {
    return this.UserService.register(body);
  }
}
