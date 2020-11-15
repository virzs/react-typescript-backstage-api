import { Result } from '../../common/interface/result.interface';
import { DefaultDTOValidationPipe } from '../../common/pipes/DefaultDTOValidationPipe';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDTO } from './dto/page.dto';
import JwtAuthGuard from '../auth/guard/jwtAuth.guard';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @ApiOperation({ summary: '根据id获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(DefaultDTOValidationPipe)
  getDetail(@Query() query: any) {
    return this.UserService.getDetailById(query);
  }

  @Get('me')
  @ApiOperation({ summary: '获取当前登录用户数据' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Req() req) {
    return this.UserService.getDetail(req);
  }

  @Post('page')
  @ApiOperation({ summary: '获取用户分页' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(DefaultDTOValidationPipe)
  getPage(@Body() body: PageDTO): Promise<Result> {
    return this.UserService.getPage(body);
  }
}
