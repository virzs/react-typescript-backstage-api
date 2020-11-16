import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultDTOValidationPipe } from 'src/common/pipes/DefaultDTOValidationPipe';
import { resLogin, resRegister } from '../user/classes/response';
import { RegisterDTO } from '../user/dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import JwtAuthGuard from './guard/jwtAuth.guard';
import JwtRefreshGuard from './guard/jwtRefresh.guard';
import { LocalAuthGuard } from './guard/localAuth.guard';

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
  @ApiOperation({
    summary: '用户登录',
    description: '登陆后返回accessToken和refreshToken',
  })
  @ApiResponse({
    status: 200,
    description: '登陆成功',
    type: resLogin,
  })
  @UseGuards(LocalAuthGuard)
  @UsePipes(DefaultDTOValidationPipe)
  async login(@Body() body: LoginDTO, @Req() req, @Res() res) {
    //req为local验证后返回的用户信息A
    return this.authService.loginWithCookies(body, req, res);
  }

  /**
   * 刷新token
   *
   */
  @Get('refresh')
  @ApiOperation({ summary: '刷新token', description: '通过cookie获取token' })
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() request) {
    return await this.authService.refreshAccessToken(request);
  }

  @Post('loginout')
  @ApiOperation({ summary: '注销登录' })
  @UseGuards(JwtAuthGuard)
  async loginout(@Req() req, @Res() res) {
    return this.authService.getCookieForLoginOut(req, res);
  }
}
