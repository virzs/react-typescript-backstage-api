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
import { DefaultDTOValidationPipe } from 'src/common/pipes/DefaultDTOValidationPipe';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试
  @Post('login')
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
