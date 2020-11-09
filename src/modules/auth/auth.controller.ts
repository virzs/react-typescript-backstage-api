import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultDTOValidationPipe } from 'src/common/pipes/DefaultDTOValidationPipe';
import { resRegister } from '../user/classes/register';
import { RegisterDTO } from '../user/dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('授权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
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
    return this.authService.register(body);
  }

  // 登录测试
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  // @UseGuards(AuthGuard('local'))
  @UsePipes(DefaultDTOValidationPipe)
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
