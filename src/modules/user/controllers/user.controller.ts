import { Result } from '../../../common/interface/result.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from '../services/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDTO } from '../dtos/page.dto';
import JwtAuthGuard from '../../auth/guards/jwtAuth.guard';
import { UpdateDTO } from '../dtos/update.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @ApiOperation({ summary: '根据id获取用户信息' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  getDetail(@Query() query: any) {
    return this.UserService.getDetailById(query);
  }

  @Get('me')
  @ApiOperation({ summary: '获取当前登录用户数据' })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  getProfile(@Req() req) {
    return this.UserService.getDetail(req);
  }

  @Put('update')
  @ApiOperation({ summary: '编辑用户信息' })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  update(@Body() body: UpdateDTO) {
    return this.UserService.updateInfo(body);
  }

  @Post('page')
  @ApiOperation({ summary: '获取用户分页' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  getPage(@Body() body: PageDTO): Promise<Result> {
    return this.UserService.getPage(body);
  }
}
